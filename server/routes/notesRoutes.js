const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/Auth");

const {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteByID,
} = require("../controllers/notesController");

router.post("/notes", authMiddleware, createNote);
router.get("/notes", authMiddleware, getAllNotes);
router.put("/notes/:id", authMiddleware, updateNote);
router.delete("/notes/:id", authMiddleware, deleteNote);
router.get("/notes/:id", authMiddleware, getNoteByID);

module.exports = router;
