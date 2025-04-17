# Ride Hailing API (Week 4 Assignment)

This is a ride-hailing REST API built with Node.js, Express, and MongoDB. It includes role-based actions for Customers, Drivers, and Admins.

## 🚦 Features

### 🚘 Ride Management
- Create a ride (`POST /rides`)
- View all rides (`GET /rides`)
- Update ride status (`PATCH /rides/:id`)
- Delete/cancel a ride (`DELETE /rides/:id`)

### 👥 User Management
- Register a new user (`POST /users`)
- View all users (`GET /users`)
- Update a user (`PATCH /users/:id`)
- Delete a user (`DELETE /users/:id`)

### 🧑‍✈️ Driver-Specific
- Update availability (`PATCH /users/:id/availability`)
- View earnings (`GET /users/:id/earnings`)

### 🛡️ Admin-Specific
- Block a user (`PATCH /admin/block-user/:id`)
- View system analytics (`GET /admin/analytics`)

---

## 🛠️ Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/ride-hailing-api.git
cd ride-hailing-api
