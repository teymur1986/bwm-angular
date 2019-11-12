const express = require('express');
const RentalsController = require('../controllers/rentals');
const router = express.Router();

router.get('', RentalsController.allRentals);
router.get('/:id', RentalsController.rentalById);

module.exports = router;
