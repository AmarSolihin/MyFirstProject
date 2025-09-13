# MyTaxi Backend API

A ride-hailing backend system for UTeM students, using Node.js, Express, and MongoDB Atlas.

## Features
- User Registration & Login
- Driver offers a ride
- Rider books a ride
- View available rides
- Mark rides as complete

## Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- RESTful API
- Hosted on Render

## How to Run
1. `npm install`
2. Add `.env` file with MongoDB URI
3. `node server.js`

## API Endpoints
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/profile/:matricNo`
- `POST /api/rides/offer`
- `POST /api/rides/book`
- `GET /api/rides/available`
- `PUT /api/rides/complete/:rideId`

## Author
Group 8 - BERR2243 Assignment
