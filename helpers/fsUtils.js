const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);


const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );


const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};


const deleteNoteById = (noteId, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading data from ${file}: `, err);
        } else {
            const notes = JSON.parse(data);
            const index = notes.findIndex(note => note.id === noteId);
            if (index !== -1) {
                notes.splice(index, 1);
                writeToFile(file, notes);
                console.info(`Note with id ${noteId} deleted successfully.`);
            } else {
                console.info(`Note with id ${noteId} not found.`);
            }
        }
    });
}


module.exports = { readFromFile, writeToFile, readAndAppend };
