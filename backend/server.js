const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // .env file load karta hai

const itemRoutes = require("./routes/itemRoutes");

const app = express();

// Middlewares
app.use(cors());          // React ko allow karo
app.use(express.json());  // Incoming JSON body ko samajhne ke liye

// Test route
app.get("/", (req, res) => {
  res.send("Lost & Found API is running");
});

// Saare /api/items wale requests itemRoutes ko jayenge
app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 5000;

// Pehle MongoDB connect, phir server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });