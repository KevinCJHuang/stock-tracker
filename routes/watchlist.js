const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/Users');
const Watchlist = require('../models/Watchlist'); 

// @route   GET api/watchlist
// @desc    Get all watchlist stocks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ user: req.user.id }).sort({
      type: 1,
    });
    res.json(watchlist);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/watchlist
// @desc    Add a new stock to the watchlist
// @access  Private
router.post(
  '/',
  [
    auth,
    check('symbol', 'Symbol is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { symbol, type } = req.body;


    try {
      
      let result = await Watchlist.findOne({symbol: symbol});

      if (result) {
        return res.status(400).json({msg: 'Symbol already exists'})
      }
    
      const newStock = new Watchlist({
        user: req.user.id,
        symbol,
        type,

      });

      const watchlist = await newStock.save();

      res.json({  watchlist  });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/watchlist/:id
// @desc    Delete watchlist
// @access  Private
router.delete('/:symbol', auth, async (req, res) => {
  try {
    let symbols = await Watchlist.find({user: req.user.id}).select({});
    let id = ""
    symbols.forEach(s => {
      if (s.symbol === req.params.symbol) id = s._id
    })

    if (!id) return res.status(404).json({msg: 'Symbol not found'}); 
   
    await Watchlist.findByIdAndRemove(id);
    res.json({msg: 'Symbol removed from watchlist.'})
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;