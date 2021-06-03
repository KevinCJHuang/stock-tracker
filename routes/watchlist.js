const express = require('express');
const router = express.Router();

// @route   GET api/watchlist
// @desc    Get all watchlist stocks
// @access  Private
router.get('/', (req, res) => {
  res.send('Get all watchlist stocks')
});

// @route   POST api/watchlist
// @desc    Add a new stock to the watchlist
// @access  Private
router.post('/', (req, res) => {
  res.send('Add new stock')
});

// @route   DELETE api/watchlist/:id
// @desc    Delete watchlist
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Delete stock from watchlist')
});

module.exports = router;