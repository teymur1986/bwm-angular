const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const config = require('./config/dev');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/user');
const app = express();
const PORT = process.PORT || 8080;

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 20
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
    mongoose.connect(config.DB_URI);
    console.log(`Server running on port: ${ PORT }`)
});