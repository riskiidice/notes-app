console.log('Starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}
const argv = yargs
    .command('add', 'Add new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'Listing all notes')
    .command('read', 'Reading a note', {
        title: titleOptions
    })
    .command('remove', 'Removing a note')
    .help()
    .argv;

var command = argv._[0];

if (command === 'add') {
    var note = notes.addNotes(argv.title, argv.body);
    if (note) {
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => {
        notes.logNote(note)
    });
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    var message = note ? notes.logNote(note) : 'Note was not found';

} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not reconized');
}