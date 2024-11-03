import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const NotesCard = ({ title, description, id, deleteNote }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Limit description length on the card
  const limitDescription = (desc, limit = 15) => {
    if (!desc) return "";
    return desc.length > limit ? `${desc.substring(0, limit)}...` : desc;
  };

  // Open modal for deletion confirmation
  const openModal = (e) => {
    e.stopPropagation(); // Prevents card click event
    setIsModalOpen(true);
  };

  // Close the modal without deleting
  const closeModal = () => setIsModalOpen(false);

  // Confirm delete and stay on the same page
  const confirmDelete = (e) => {
    e.stopPropagation(); // Prevents any unintended navigation
    deleteNote(id); // Deletes the note
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div
      className="bg-purple-900 w-[300px] shadow-lg rounded-lg mx-auto ml-auto"
      onClick={() => navigate(`/note/${id}`)} // Card click navigates to details
    >
      <h3 className="text-white text-lg p-2 text-center bg-purple-400 rounded-t-lg">
        {title}
      </h3>
      <p className="p-4 text-gray-200 mb-3">
        {limitDescription(description, 20)}
      </p>
      <div className="flex justify-between mx-4 pb-4">
        <button className="text-white" onClick={openModal}>
          <FaTrash />
        </button>
        <button
          className="text-white"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/update/${id}`);
          }}
        >
          <FaEdit />
        </button>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this note?"
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default NotesCard;
