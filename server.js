// server.js

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch(err => console.log(err));

const User = require("./models/user");

// create a new user
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// get active users
app.get("/users/active", async (req, res) => {
  try {
    const activeUsers = await User.find({ isActive: true });
    res.json(activeUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// update a user by id
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete a user by id
app.delete("/users/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// start server
app.listen(3000, () => console.log("Server running on port 3000"));