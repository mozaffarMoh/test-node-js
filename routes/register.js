const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import jsonwebtoken library
const Users = require("../models/Users");
const router = express.Router();

/* Register new account */
router.post("/", async (req, res) => {
  const { username, email, password, profilePhoto } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!username || !email || !password) {
      return res.status(400).send("Username, email, and password are required");
    }
    if (existingUser) {
      return res.status(400).send("User already exists !!");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
      profilePhoto: profilePhoto || '',
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    return res
      .status(201)
      .json({ message: "Registration successful", token, userId: newUser._id }); // Send token in response
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
