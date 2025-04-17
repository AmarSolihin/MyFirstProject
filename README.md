# Ride-Hailing API (Week 4 Assignment)

This project is a basic ride-hailing backend built with **Express.js** and **MongoDB**, supporting basic CRUD operations for users and rides.

---

## 🚀 How to Run

1. **Install MongoDB** and make sure it's running on `mongodb://localhost:27017`
2. **Clone or copy the project files**
3. **Install dependencies**:
   ```bash
   npm install express mongodb cors
   ```
4. **Run the server**:
   ```bash
   node index.js
   ```

---

## 🔗 API Endpoints

### USERS
- `POST /users` – Create a new user
- `GET /users` – List all users
- `PATCH /users/:id` – Update user details
- `DELETE /users/:id` – Remove a user

### RIDES
- `POST /rides` – Create a new ride request
- `GET /rides` – View all rides
- `PATCH /rides/:id` – Update ride status (e.g., from 'requested' to 'completed')
- `DELETE /rides/:id` – Cancel a ride

---

## 📬 Postman
Use the provided `postman_collection.json` file to test the API in Postman.

---

## 📌 Notes
- Database used: `testDB`
- Collections: `users`, `rides`
- CORS enabled for frontend development

---

## 📄 Author & License
- Created for **Week 4 Web Programming Assignment**
- MIT License

