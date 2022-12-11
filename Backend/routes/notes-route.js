const express = require("express");
const noteControllers = require("../controllers/notes-controller");
const router = express.Router();

//! get all notes
router.get("/", noteControllers.getAllNotes);

//! get note using note id
router.get("/:nid", noteControllers.getNoteByNoteId);

//! post a note
router.post("/", noteControllers.createNote);

//! update a note
router.patch("/:nid", noteControllers.updateNote);

//! delete a note
router.delete("/:nid", noteControllers.deleteNote);

module.exports = router;
