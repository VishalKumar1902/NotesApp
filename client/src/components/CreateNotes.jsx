import React, { useEffect, useState } from "react";
import NotesCard from "./NotesCard"; // Import your pre-built card component
import { FaPlus } from "react-icons/fa"; // Import icons if needed
import { useAuth } from "../context/AuthContext";

const CreateNotes = () => {
  // use states for creating a note
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //use state for fetching notes from database
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Decode token and set the user's name once

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserName(decoded.userName);
      } catch (error) {
        console.log("Error decoding token :", error);
      }
    }
  }, []); // Empty dependency array ensures this runs only once

  // we need to use useeffect to fetch notes

  async function fetchNotes() {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // if we get no response response.ok = false --> !false -->true

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch notes");
      }

      // otherwise set data in notes
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // function to submit the form data (note)

  async function handleSubmit(e) {
    e.preventDefault();

    // if the title and the description are not provided then show error and end handleSubmit function
    if (!title || !description) {
      setError("Both title and description are required!");
      return;
    }

    // if provided or above condition fails then create a new note object to send it to backend as multiple data can be send together via object only
    const newNote = { title, description };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // convert javascript object to json format
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        const saveNote = await response.json();
        console.log(saveNote);
        setNotes((prevNotes) => [saveNote, ...prevNotes].slice(0, 10));
        setTitle("");
        setDescription("");
        setError("");
        // Fetch notes again to ensure the list is up-to-date
        // fetchNotes();
      } else {
        const errorData = await response.json();

        setError(errorData.message || "Failed to create note");
      }
    } catch (error) {
      console.log("Error creating note: ", error);
      setError("An error occured while creating the note");
    }
  }

  // delete note functionality

  async function handleDelete(noteId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        // update the state to remove the deleted note
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      } else {
        const errorData = await response.json();
        console.log("Failed to delete note: ", errorData.message);
      }
    } catch (error) {
      console.log("Error deleting note: ", error);
    }
  }

  return (
    <div className="container mx-auto mt-28 p-6 ">
      <form
        className="mb-6 p-4 bg-gradient-to-r from-customGradientStart to-customGradientEnd  rounded-lg shadow-lg max-w-4xl mx-auto "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-8 mt-3 text-center text-white ">
          Welcome {user.name}, Start creating notes.
        </h2>
        {/* code for showing error  */}

        {error && <p className="text-black font-semibold mb-2">{error}</p>}

        {/* input fields in the form */}
        <input
          type="text"
          placeholder="Title..."
          className="w-full p-2 mb-4 border border-x-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F37335] shadow-sm"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Description..."
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F37335] shadow-sm h-32 resize-none"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button
          type="submit"
          className="bg-red-600
hover:bg-yellow-300 transition duration-300
hover:text-black
          
          text-white p-2 rounded flex items-center"
        >
          <FaPlus
            className="
          mr-2"
          />
          Add Note
        </button>
      </form>
      <h3 className="text-3xl font-bold mb-4 mt-20 text-center">
        Recent notes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {notes.map((note) => (
          <NotesCard
            key={note._id}
            id={note._id} // Pass the note ID to the NotesCard
            title={note.title}
            description={note.description}
            deleteNote={handleDelete} // Pass the delete handler
          />
        ))}
      </div>
    </div>
  );
};

export default CreateNotes;
