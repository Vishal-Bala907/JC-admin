import React from "react";
import ReactDOM from "react-dom"; // ✨ Import this
import { IoCloseSharp } from "react-icons/io5";
import ViewOrder from "./ViewOrder";

const TelecallerOrderModal = ({ isOpen, onClose, staffId, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    // ✨ Create portal here
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white shadow-xl p-6 min-h-screen min-w-full relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[32px] right-2 text-gray-500 hover:text-gray-700"
        >
          <IoCloseSharp size={25}/>
        </button>
        <ViewOrder staffId={staffId} />

        {children}
      </div>
    </div>,
    document.body 
  );
};

export default TelecallerOrderModal;
