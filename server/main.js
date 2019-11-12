const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const config = require('./config/dev');
const rentalRoutes = require('./routes/rentals');
const app = express();
const PORT = process.PORT || 8080;

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 20
};

app.use(cors(corsOptions));

app.use('/api/v1/rentals', rentalRoutes);

app.listen(PORT, () => {
    mongoose.connect(config.DB_URI);
    console.log(`Server running on port: ${ PORT }`)
});