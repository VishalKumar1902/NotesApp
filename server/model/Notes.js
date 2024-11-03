const mongoose = require("mongoose");

//This is a schema definition for Notes collection
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // This field expects an ObjectId reference
      ref: "User", // Refers to the 'User' model
      required: true,
    },
  },
  { timestamps: true }
);

// this creates a notes modelusing the notesSchema
const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;
