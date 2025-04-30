import React from "react";
import ReactDOM from "react-dom";
import OrderedBy from "./OrderedBy";
import { IoCloseSharp } from "react-icons/io5";

const OrderByModal = ({ isOpen, onClose, orderId, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 overflow-y-scroll">
      <div className="bg-white dark:bg-gray-800 shadow-xl p-6 min-h-[100vh] min-w-[100vw] relative text-gray-800 dark:text-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-[60] p-2.5 rounded-full 
            bg-white hover:bg-gray-100 
            dark:bg-gray-700 dark:hover:bg-gray-600
            text-gray-600 hover:text-gray-800 
            dark:text-gray-200 dark:hover:text-white
            shadow-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 
            focus:ring-gray-500 dark:focus:ring-gray-400"
          aria-label="Close modal"
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
