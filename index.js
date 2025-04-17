// index.js
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db;

async function connectToMongoDB() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db("rideHailingDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
connectToMongoDB();

// ---- USERS COLLECTION ----
app.post('/users', async (req, res) => {
    try {
        const result = await db.collection('users').insertOne(req.body);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(400).json({ error: "Invalid user data" });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

app.patch('/users/:id', async (req, res) => {
    try {
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.modifiedCount === 0) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ update: result.modifiedCount });
    } catch (err) {
        res.status(400).json({ error: "Invalid user ID or data" });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const result = await db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" });
        res.status(200).json({ deleted: result.deletedCount });
    } catch (err) {
        res.status(400).json({ error: "Invalid user ID" });
    }
});

// Admin: Block User
app.patch('/admin/block-user/:id', async (req, res) => {
    try {
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { blocked: true } }
        );
        res.status(200).json({ blocked: result.modifiedCount });
    } catch (err) {
        res.status(400).json({ error: "Invalid user ID" });
    }
});

// Admin: View System Analytics (basic count)
app.get('/admin/analytics', async (req, res) => {
    try {
        const userCount = await db.collection('users').countDocuments();
        const rideCount = await db.collection('rides').countDocuments();
        res.status(200).json({ totalUsers: userCount, totalRides: rideCount });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

// ---- RIDES COLLECTION ----
app.post('/rides', async (req, res) => {
    try {
        const result = await db.collection('rides').insertOne(req.body);
        res.status(201).json({ id: result.insertedId });
    } catch (err) {
        res.status(400).json({ error: "Invalid ride data" });
    }
});

app.get('/rides', async (req, res) => {
    try {
        const rides = await db.collection('rides').find().toArray();
        res.status(200).json(rides);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch rides" });
    }
});

app.patch('/rides/:id', async (req, res) => {
    try {
        const result = await db.collection('rides').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (result.modifiedCount === 0) return res.status(404).json({ error: "Ride not found" });
        res.status(200).json({ update: result.modifiedCount });
    } catch (err) {
        res.status(400).json({ error: "Invalid ride ID or data" });
    }
});

app.delete('/rides/:id', async (req, res) => {
    try {
        const result = await db.collection('rides').deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "Ride not found" });
        res.status(200).json({ deleted: result.deletedCount });
    } catch (err) {
        res.status(400).json({ error: "Invalid ride ID" });
    }
});

// Driver: Update availability
app.patch('/driver/availability/:id', async (req, res) => {
    try {
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.params.id), role: "driver" },
            { $set: { available: req.body.available } }
        );
        res.status(200).json({ updated: result.modifiedCount });
    } catch (err) {
        res.status(400).json({ error: "Invalid driver ID or data" });
    }
});

// Driver: View earnings
app.get('/driver/earnings/:id', async (req, res) => {
    try {
        const rides = await db.collection('rides').find({ driverId: req.params.id }).toArray();
        const totalEarnings = rides.reduce((sum, ride) => sum + (ride.fare || 0), 0);
        res.status(200).json({ totalEarnings });
    } catch (err) {
        res.status(500).json({ error: "Error calculating earnings" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
