const HttpError = require("../models/http-error");
const Note = require("../models/note");

const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      msg: "All Notes",
      notes: notes.map((notes) => notes.toObject({ getters: true })),
    });
  } catch (e) {
    console.log(e);
    return next(new HttpError("Not able to find all notes", 500));
  }
};

const getNoteByNoteId = async (req, res, next) => {
  const { nid } = req.params;
  try {
    const note = await Note.findOne({ id: nid });
    res.status(200).json({
      msg: "Note found",
      note: note.toObject({ getters: true }),
    });
  } catch (e) {
    console.log(e);
    return next(new HttpError("Not able find a note", 500));
  }
};

const createNote = async (req, res, next) => {
  const { title, text, user } = req.body || {};

  const note = new Note({ title, text, user });
  try {
    const createdNote = await note.save();
    res.status(200).json({
      msg: "Note created",
      note: createdNote.toObject({ getters: true }),
    });
  } catch (e) {
    console.log(e);
    return next(new HttpError("Not able to create a note", 500));
  }
};

const updateNote = async (req, res, next) => {
  const { nid } = req.params;
  const { title, text, user } = req.body || {};
  let note;
  try {
    note = await Note.findOne({ id: nid });
  } catch (e) {
    return next(new HttpError("Could not find the note", 404));
  }

  if (!note) {
    return next(new HttpError("Could not find the note", 404));
  }

  try {
    const note = await Note.updateOne({ id: nid }, { text });

    // const note = await Note.findOne({ id: nid });

    console.log(note);
    res.status(200).json({
      msg: "Note updated",
      // note: note.toObject({ getters: true }),
    });
  } catch (e) {
    console.log(e);
    return next(new HttpError("Not able update a note", 500));
  }
};

const deleteNote = async (req, res, next) => {
  const { nid } = req.params;
  const note = await Note.findOne({ id: nid });
  if (!note) {
    return next(new HttpError("Not able to find a note", 500));
  }
  try {
    await Note.deleteOne({ id: nid });
    res.status(200).json({
      msg: "Note deleted",
    });
  } catch (e) {
    return next(new HttpError("Not able delete a note", 500));
  }
};

exports.getAllNotes = getAllNotes;
exports.getNoteByNoteId = getNoteByNoteId;
exports.createNote = createNote;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;
