import React from "react";

const Modal = ({ isOpen, title, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] sm:w-[400px]">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
