require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// MongoDB connection with improved configuration
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected');
    console.log('📁 Database:', mongoose.connection.name);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Monitor for MongoDB connection errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

// Routes
const userRouter = require('./routes/userRouter');
const movieRouter = require('./routes/movieRoutes');

app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!' 
  });
});

// Handle unhandled routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;

// Start server and connect to MongoDB
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      connectDB();
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();