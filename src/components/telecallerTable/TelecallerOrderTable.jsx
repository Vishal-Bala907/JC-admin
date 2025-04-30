import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

const TelecallerOrderTable = ({ orders, currency, getNumberTwo }) => {
  // Add prop-types validation
  if (!Array.isArray(orders)) {
    console.error('TelecallerOrderTable: orders prop must be an array');
    return null;
  }
  console.log("orders: ", orders);
  
  if (!currency || typeof getNumberTwo !== 'function') {
    console.error('TelecallerOrderTable: missing required props');
    return null;
  }

  // Handle empty orders case
  if (orders.length === 0) {
    return (
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
        <TableRow className="dark:border-gray-700 dark:text-black">
          <TableCell colSpan="10" className="px-6 py-4 text-center font-medium text-gray-500">
            No orders found for this telecaller
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  // Add try-catch for potential map errors
  try {
    return (
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
        {orders.map((order, i) => (
          <TableRow key={i} className={`dark:border-gray-700 dark:text-black bg-gray-200 hover:bg-gray-50 dark:hover:bg-gray-300 transition-colors`}>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 dark:text-black text-left">
              {i + 1}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 dark:text-black">
              <span className={`text-gray-700 font-semibold dark:text-black text-md ${!order.riderName && "italic font-thin"}`}>
                {order.riderName || "Rider not assigned yet"}
              </span>
            </TableCell>
            <TableCell className="px-6 py-1 text-gray-600 dark:text-black">
              {order.cart?.length || 0}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-gray-600 dark:text-black">
              {order.paymentMethod}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-gray-600 dark:text-black">
              {order.shippingCost}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-gray-600 dark:text-black">
              {order.status}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-gray-600 dark:text-black">
              ₹{order.subTotal}
            </TableCell>
            <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-gray-600 dark:text-black">
              ₹{order.total}
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    );
  } catch (error) {
    console.error('Error rendering order table:', error);
    return <div>Error displaying orders</div>;
  }
};

export default TelecallerOrderTable;
