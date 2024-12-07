const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve the board directory where the model and textures are located
app.use('/board', express.static(path.join(__dirname, 'board')));

// Serve the node_modules for three.js and other dependencies
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// Serve the index.html file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware to parse incoming JSON requests
app.use(express.json());
// Serve the assets directory
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Endpoint to log mouse events
app.post('/log-mouse-event', (req, res) => {
  const event = req.body;
  const log = `${event.type} at (${event.x}, ${event.y}) on ${event.time}\n`;
  fs.appendFileSync('mouse-events.log', log); // Append the event to a log file
  res.sendStatus(200); // Send an OK response
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
