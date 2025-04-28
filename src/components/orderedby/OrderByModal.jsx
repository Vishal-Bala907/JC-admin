import React from "react";
import ReactDOM from "react-dom"; // ✨ Import this
import OrderedBy from "./OrderedBy";
import { IoCloseSharp } from "react-icons/io5";

const OrderByModal = ({ isOpen, onClose, orderId, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-scroll">
      <div className="bg-white dark:bg-gray-800 shadow-xl p-6 min-h-[100vh] min-w-[100vw] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-1 right-1 md:right-3 z-[60] p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg text-gray-500 hover:text-gray-700 transition-colors"
        >
          <IoCloseSharp size={25} />
        </button>
        <OrderedBy orderId={orderId} />
        {children}
      </div>
    </div>,
    document.body
  );
};

export default OrderByModal;
