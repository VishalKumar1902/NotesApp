import React, { useEffect, useState } from "react";
import NotesCard from "./NotesCard";
import { useAuth } from "../context/AuthContext";

const MyNotes = () => {
  const [notes, setNotes] = useState([]);
  const { user, isAuthenticated } = useAuth();

  const fetchNotes = async () => {
    // we also need to get the token
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/notes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // if you did not get response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch notes");
      }

      // if everything right then set the notes in state
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log("Error fetching notes: ", error);
    }
  };

  // useEffect hook

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotes(); // Fetch only if authenticated
    }
  }, []);

  // delete a note
  const handleDelete = async (noteId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/api/notes/${noteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        // Update state to remove deleted note
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
  };

  return (
    <div className="container mx-auto  p-5">
      <h3 className="text-3xl font-bold mb-4 mt-[70px] text-center">
        Hi! {user ? user.name : "Guest"}, here are your notes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {notes.map((note) => (
          <NotesCard
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
            deleteNote={handleDelete} // Pass the delete function
          />
        ))}
      </div>
    </div>
  );
};

export default MyNotes;