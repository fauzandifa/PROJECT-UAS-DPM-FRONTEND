const express = require('express');
const router = express.Router();

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    // TODO: Implement get movies logic
    res.json({ message: 'Get movies route working' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get movie by id
router.get('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // TODO: Implement get movie by id logic
    res.json({ message: `Get movie ${id} route working` });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;