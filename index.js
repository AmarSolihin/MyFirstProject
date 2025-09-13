const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(cors()); 


mongoose.connect('mongodb://localhost:27017/ehailingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({}, { strict: false });
const User = mongoose.model('User', userSchema, 'users');

app.get('/analytics/passengers', async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: "rides",
          localField: "_id",
          foreignField: "userId",
          as: "rides"
        }
      },
      {
        $unwind: "$rides"
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          totalRides: { $sum: 1 },
          totalFare: { $sum: "$rides.fare" },
          avgDistance: { $avg: "$rides.distance" }
        }
      },
      {
        $project: {
          _id: 0,
          name: 1,
          totalRides: 1,
          totalFare: 1,
          avgDistance: 1
        }
      }
    ]);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Aggregation failed.');
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
