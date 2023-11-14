// app.js (or server.js)

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(express.json());
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3001' }));

// Use the userRoutes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
