

const express = require('express');
const authrouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require("dotenv").config()

authrouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

   
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


authrouter.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
   
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    user = new User({ name, email, password });

    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    
    await user.save();

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = authrouter;
