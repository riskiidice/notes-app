console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNotes = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {

  }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNote = notes.filter(
    (note) => { return note.title === title; }
  );
  return filteredNote[0];

}

var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNote = notes.filter(
    (note) => note.title !== title
  );
  saveNotes(filteredNote);
  return notes.length !== filteredNote.length;
};

var logNote = (note) => {
  console.log('Note created');
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}

module.exports = {
  addNotes,
  getAll,
  getNote,
  removeNote,
  logNote
}