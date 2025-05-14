const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/states', require('./routes/states'));

// Root route (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 404 route
app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
