const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3600;

// Serve static files if needed
app.use(express.static('public'));

// Root: Serve index.html
app.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// 404: Serve 404.html for any unknown route
app.all('*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
