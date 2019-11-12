const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const app = express();
const PORT = process.PORT || 8080;

const rentalRoutes = require('./routes/rentals');

app.use('/api/v1/rentals', rentalRoutes);

app.listen(PORT, () => {
    mongoose.connect(config.DB_URI);
    console.log(`Server running on port: ${ PORT }`)
});