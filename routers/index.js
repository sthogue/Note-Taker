const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// GET Route for a specific tip
notes.get('/:noteID', (req, res) => {
    const note_ID = req.params.noteID;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.noteID === note_ID);
        return result.length > 0
          ? res.json(result)
          : res.json('No tip with that ID');
      });
  });
  
  // DELETE Route for a specific tip
  notes.delete('/:noteID', (req, res) => {
    const note_ID = req.params.noteID;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((note) => note.noteID !== note_ID);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Note ${note_ID} has been deleted 🗑️`);
      });
  });
  
  // POST Route for a new UX/UI tip
  notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote = {
        title,
        text,
        noteID: uuidv4(),
      };
  
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully`);
    } else {
      res.error('Error in adding tip');
    }
  });
  
  module.exports = notes;