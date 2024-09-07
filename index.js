const express = require('express');
const cors = require('cors');
const extractionRoutes = require('./routes/extractionRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', extractionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
