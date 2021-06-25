const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/Users');
const Portfolio = require('../models/Portfolio');

// @route   GET api/portfolio
// @desc    Get all portfolio stocks
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ user: req.user.id }).sort({
      type: 1,
    });
    res.json(portfolio);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/portfolio
// @desc    Add a new stock to the portfolio
// @access  Private
router.post(
  '/',
  [
    auth,
    check('symbol', 'Symbol is required').not().isEmpty(),
    check('numShares', 'numShares is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let portfolio = await Portfolio.find({
        user: req.user.id,
        symbol: req.body.symbol,
      });
      // New Symbol
      if (portfolio.length === 0) {
        const newPortfolio = new Portfolio({
          user: req.user.id,
          symbol: req.body.symbol,
          numShares: req.body.numShares,
          type: req.body.type,
        });

        const result = await newPortfolio.save();
        return res.json({ result });
      }
      portfolio = portfolio[0];

      if (req.body.numShares + portfolio.numShares < 0) {
        return res.status(400).json({ msg: 'Shares can not be negative' });
      }

      portfolio = await Portfolio.findByIdAndUpdate(
        portfolio._id,
        {
          numShares: parseInt(req.body.numShares) + parseInt(portfolio.numShares),
        },
      );
      return res.json(portfolio);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
