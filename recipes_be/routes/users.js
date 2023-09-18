// routes/users.js

const express = require("express")
const router = express.Router()
const User = require("../models/User.js") // Import the User model
const jwt = require("jsonwebtoken")
const config = require("../config.js")
const bcrypt = require("bcrypt")

// Create a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if the user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create a new user
    const user = new User({ email, password })
    await user.save()
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: "1h", // Adjust the expiration time as needed
    })

    // Return the token
    res.status(201).json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Find the user by email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Compare the provided password with the stored hash
    const passwordMatch = password === user.password

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: "1h", // Adjust the expiration time as needed
    })

    // Return the token
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal Server Error" })
  }
})
// Add more user-related routes as needed

module.exports = router
