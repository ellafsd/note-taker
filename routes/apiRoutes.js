const router = require('express').Router();
const uuid = require('../helpers/uuid');
const path = require('path');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');


// GET /api/notes - Return all saved notes as JSON
router.get('/notes', (req, res) =>{
  readFromFile('./db/db.json')
  .then((data) => res.json(JSON.parse(data)))
  .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes' });
  });
});    


// POST /api/notes - Save a new note
router.post('/notes', (req, res) =>{
    const { title, text } = req.body; 
    if (title && text) {      //if title and text are provided, create a new note
       const newNote = {
           id: uuid(),      //id: uuid(): Generates a unique identifier for the note using the uuid function.
           title,           //title and text: These values are taken directly from the request body
           text,
       };
        readAndAppend(newNote, './db/db.json');     //calls the readAndAppend function to add the new note to the db.json file.

        const response = {        //create a response object to send back to the client invludes the new note in the response body.
          status: 'success',
          body: newNote,
        };
    
        res.json(response);     //sends the response object back to the client in JSON format
      } else {
           res.status(400).json('Error in posting note');
      }
    });

// DELETE route for deleting a note
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  readFromFile(path.join(__dirname, '../db/db.json')).then((data) => {
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter(note => note.id !== noteId);

    writeToFile(path.join(__dirname, '../db/db.json'), filteredNotes);

    res.json(`Note with id ${noteId} has been deleted`);
  });
});

module.exports = router;