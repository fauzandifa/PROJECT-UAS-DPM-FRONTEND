require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Create admin user function
const createAdminUser = async () => {
  try {
    const User = require('./models/user');
    const adminExists = await User.findOne({ email: 'admin@tiketku.com' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('kelompok7', 12);
      const adminUser = new User({
        username: 'admin',
        email: 'admin@tiketku.com',
        password: hashedPassword,
        nama: 'Admin TiketKu',
        isAdmin: true
      });
      
      await adminUser.save();
      console.log('✅ Admin user created successfully');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
  }
};

// MongoDB connection
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
    await createAdminUser(); // Create admin user after connection
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.log('Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Monitor MongoDB connection
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

// Error handlers
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: 'Something went wrong!' 
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ 
    status: 'error',
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5000;

// Server startup
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

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();