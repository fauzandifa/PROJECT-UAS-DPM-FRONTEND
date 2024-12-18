// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  noTelp: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// models/Booking.js
const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieId: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    required: true
  },
  waktu: {
    type: String,
    required: true
  },
  seats: [{
    type: String,
    required: true
  }],
  totalHarga: {
    type: Number,
    required: true
  },
  statusPembayaran: {
    type: String,
    enum: ['pending', 'sukses', 'gagal'],
    default: 'pending'
  },
  metodePembayaran: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register user baru
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, nama, noTelp } = req.body;

    // Cek apakah username atau email sudah ada
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ message: 'Username atau email sudah digunakan' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = new User({
      username,
      email,
      password: hashedPassword,
      nama,
      noTelp
    });

    await user.save();
    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (error) {
    res.status(500).json({ message: 'Error saat registrasi' });
  }
});

// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const verifyToken = require('../middleware/auth');

// Buat pemesanan baru
router.post('/bookings', verifyToken, async (req, res) => {
  try {
    const booking = new Booking({
      userId: req.user.id,
      ...req.body
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error saat membuat pemesanan' });
  }
});

// Dapatkan semua pemesanan user
router.get('/bookings', verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error saat mengambil data pemesanan' });
  }
});

// Update status pembayaran
router.patch('/bookings/:id/payment', verifyToken, async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { statusPembayaran: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: 'Error saat update status pembayaran' });
  }
});

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cinemaapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api', userRoutes);
app.use('/api', bookingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});