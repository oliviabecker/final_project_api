const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3500;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static HTML files (for root and 404)
app.use(express.static(path.join(__dirname, 'views')));


// Connect to MongoDB
mongoose.connect('mongodb+srv://ocbecker24:NrfWliJwnQqeQsR1@clusterapi.sz6d8wr.mongodb.net/statesDB?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/states', require('./routes/states'));

// Root Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
  });

// 404 handler (for non-API routes)
app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Start server
app.listen
