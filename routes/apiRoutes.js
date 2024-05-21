const router = require('express').Router();
const uuid = require('../helpers/uuid');
const db = require('../db/db.json');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


router.get('/notes', (req, res) =>{
    readFromFile('./db/feedback.json').then((data) => res.json(JSON.parse(data)))
});
      

router.post('/notes', (req, res) =>{
    const { noteTitle, noteDescription } = req.body;
       
    if (noteTitle && noteDescription) {
        const newNote = {
            noteTitle,
            noteDescription,
            feedback_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
          status: 'success',
          body: newNote,
        };
    
        res.json(response);
      } else {
        res.json('Error in posting note');
      }

});

module.exports = router;


