const Rental = require('../models/rental');

exports.allRentals = (req, res) => {
    Rental.find({}, (error, rentals) => {
        if (error) {
            console.log(`Cannot find rental entities.`);
            res.status(422).json({
                errors: [
                    { title: 'Rental Error', detail: 'Could not find rental.' }
                ], 
            });
        }
        res.json(rentals);
    });
}

exports.rentalById = (req, res) => {
    const { id = 0 } = req.params; 
    Rental.findById(id, (error, rentals) => {
        if (error) {
            console.log(`Cannot find rental entities.`, error);
            res.status(422).json({
                errors: [
                    { title: 'Rental Error', detail: 'Could not find rental.' }
                ], 
            });
        }
        res.json(rentals);
    });
}