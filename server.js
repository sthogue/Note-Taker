// Import Express.js
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const api = require('./routers/index.js');
const { v4: uuidv4 } = require('uuid');
// Initialize an instance of Express.js
const app = express();

// Specify on which port the Express.js server will run
const PORT = 3001;

// Static middleware pointing to the public folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create Express.js routes for default '/', '/send' and '/routes' endpoints - this is the homepage
app.get('/', (req, res) => res.send('Navigate to /routes'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
 
// This method sends a JSON response with the correct content type.
app.get('/api/notes', (req, res) => res.json(db));

// POST method route
app.post('/api/notes', (req, res) => {
  res.json(`${req.method} request received to add a note`);
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      review_id: uuidv4(),
    };

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);



// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

