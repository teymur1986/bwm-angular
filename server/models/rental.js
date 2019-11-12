const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rentalSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: [128, `Too long, 'Title' shouldn't increase 128 characters.`]
    },
    city: {
        type: String,
        required: true,
        lowercase: true,
    },
    street: {
        type: String,
        required: true,
        min: [4, `Too short, 'Street' shouldn't be less then 4 characters.`],
        max: [128, `Too long, 'Street' shouldn't increase 128 characters.`]
    },
    category: {
        type: String,
        required: true,
        lowercase: true,
    },
    category: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    shared: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dailyRate: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

module.exports = mongoose.model('Rental', rentalSchema);