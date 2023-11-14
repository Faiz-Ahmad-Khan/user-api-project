const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose'); // Import mongoose here
const User = require('../models/User');

router.get('/fetch-users', async (req, res) => {
  try {
    const response = await axios.get('https://gorest.co.in/public-api/users');
    const apiData = response.data.data;
    const transformedData = apiData.map((item) => ({
      _id: new mongoose.Types.ObjectId(), // Generate a unique ObjectId for _id
      name: item.name,
      email: item.email,
      gender: item.gender,
      status: item.status,
      createdAt: item.createdAt, // Try both 'created_at' and 'createdAt'
      updatedAt: item.updatedAt, // Try both 'updated_at' and 'updatedAt'
    }));
    await User.create(transformedData);
     
    res.status(200).json(transformedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching and storing data' });
  }
});

router.put('/update-user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    updatedData.updatedAt = new Date(); // Update 'updatedAt' field

    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user data' });
  }
});

module.exports = router;
