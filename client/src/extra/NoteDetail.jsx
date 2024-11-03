import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NoteDetail = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoteDetail = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
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

        const data = await response.json();
        setNote(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchNoteDetail();
  }, [id]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-24 mb-10 px-4 md:px-10 lg:px-24 flex flex-col items-start">
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-700 hover:text-gray-900 bg-gray-200 rounded-full px-3 py-1 mb-4"
        style={{ fontSize: "1.25rem" }}
        aria-label="Go Back"
      >
        ←
      </button>

      <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-white">
        {note ? (
          <>
            {/* Title Section */}
            <div className="p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-t-lg">
              <h2 className="text-3xl font-semibold">{note.title}</h2>
            </div>

            {/* Description Section */}
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <p className="text-lg text-gray-800">{note.description}</p>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
