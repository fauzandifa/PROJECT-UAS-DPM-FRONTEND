// models/Movie.js
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true
  },
  overview: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  genre: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isNowPlaying: {
    type: Boolean,
    default: false
  },
  isComingSoon: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', MovieSchema);

// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});

// Get popular movies
router.get('/movies/popular', async (req, res) => {
  try {
    const movies = await Movie.find({ isPopular: true });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching popular movies' });
  }
});

// Get now playing movies
router.get('/movies/now-playing', async (req, res) => {
  try {
    const movies = await Movie.find({ isNowPlaying: true });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching now playing movies' });
  }
});

// Get coming soon movies
router.get('/movies/coming-soon', async (req, res) => {
  try {
    const movies = await Movie.find({ isComingSoon: true });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching coming soon movies' });
  }
});

// Add new movie (Admin only)
router.post('/movies', verifyToken, isAdmin, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error adding movie' });
  }
});

// Update movie (Admin only)
router.put('/movies/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Error updating movie' });
  }
});

// Delete movie (Admin only)
router.delete('/movies/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting movie' });
  }
});

module.exports = router;

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use routes
app.use('/api', movieRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});