import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Get the note ID from the URL

  useEffect(() => {
    // Fetch the existing note data when the component mounts
    const fetchNote = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`https://notesapp-qdlm.onrender.com/api/notes/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch note");
        }

        const noteData = await response.json();
        setTitle(noteData.title);
        setDescription(noteData.description);
      } catch (error) {
        console.log("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [id]);

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Both title and description are required!");
      return;
    }

    const updatedNote = { title, description };
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`https://notesapp-qdlm.onrender.com/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedNote),
      });

      if (response.ok) {
        navigate(-1); // Redirect to notes list after successful update
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update note");
      }
    } catch (error) {
      console.log("Error updating note:", error);
      setError("An error occurred while updating the note");
    }
  };

  return (
    <div className="container mx-auto mt-20 p-6 ">
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 bg-gradient-to-r from-customGradientStart to-customGradientEnd   rounded-lg shadow-lg max-w-4xl mx-auto mt-20"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white ">
          Update Note
        </h2>
        {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Title..."
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F37335]  shadow-sm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description..."
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#F37335]  shadow-sm h-32 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-600
hover:bg-yellow-300 text-white hover:text-black p-2 rounded flex items-center  transition duration-300"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default UpdateNote;
