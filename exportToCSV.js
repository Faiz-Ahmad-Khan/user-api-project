// exportToCSV.js
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const mongoose = require('mongoose');
const User = require('./models/User'); // Import the User model

// Define the CSV Writer
const csvWriter = createCsvWriter({
  path: 'user_data.csv',
  header: [
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'gender', title: 'Gender' },
    { id: 'status', title: 'Status' },
    { id: 'createdAt', title: 'Created At' },
    { id: 'updatedAt', title: 'Updated At' },
  ],
});

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use async/await with try-catch
async function exportData() {
  try {
    // Fetch data from the User collection
    const users = await User.find({});

    // Write data to a CSV file
    await csvWriter.writeRecords(users);

    console.log('Data exported to CSV file');
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close(); // Close the MongoDB connection
  }
}

exportData(); // Call the function to initiate data export
