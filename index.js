const express = require('express');
const cors = require('cors');
const extractionRoutes = require('./routes/extractionRoutes');
const bodyParser = require('body-parser');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api', extractionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
