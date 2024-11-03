const Notes = require("../model/Notes");

//create a new note
// we also need to add user id to identify which note belong to which user

const createNote = async (req, res) => {
  const data = req.body;

  try {
    // Add the user's ID from the token to the note
    const note = new Notes({
      ...data,
      userId: req.user.id, // Attach the logged-in user's ID
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all notes but specific to user only ( so also add user id in find())

const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a note by id

const updateNote = async (req, res) => {
  try {
    const id = req.params.id; // getting note id
    const userId = req.user.id; //geting user id

    // find the note related to user in database
    const note = Notes.findOne({ _id: id, userId });
    //if no note exist in database
    if (!note) {
      return res.status(404).json({ message: "note not found" });
    }

    // Update the note if it belongs to the user
    const updatedNote = await Notes.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete a note

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id; // Get logged-in user's ID

    //find the note and check if it belongs to the logged in user
    const note = await Notes.findOne({ _id: id, userId });

    // if note not exist
    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }
    //delete the note if it belongs to the user
    await Notes.findByIdAndDelete(id);

    // If the note was deleted, return a success response
    res.status(200).json({ message: "Note deleted successfully" }); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get a note by ID for the logged-in user
const getNoteByID = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    // find the note by ID and ensure it belongs to that user

    const note = await Notes.findOne({ _id: id, userId });

    // if no note exist or it dosen't belong to the user
    if (!note) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }
    // If the note exists, return it
    res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  updateNote,
  deleteNote,
  getNoteByID,
};

// Even though the frontend may show only the notes belonging to the logged-in user, malicious users can still  send requests (via tools like Postman) to update or delete notes that don’t belong to them by altering the note ID in the request.
