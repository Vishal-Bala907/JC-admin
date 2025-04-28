import React from "react";
import ReactDOM from "react-dom"; // ✨ Import this
import OrderedBy from "./OrderedBy";
import { IoCloseSharp } from "react-icons/io5";

const OrderByModal = ({ isOpen, onClose, orderId, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    // ✨ Create portal here
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 min-h-screen max-w-5xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[32px] right-2 text-gray-500 hover:text-gray-700"
        >
          <IoCloseSharp size={25}/>
        </button>
        <OrderedBy orderId={orderId} />

        {children}
      </div>
    </div>,
    document.body // ✨ Portal target
  );
};

export default OrderByModal;
