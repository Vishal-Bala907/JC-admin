import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

const OrderedbyTable = ({ data, currency, getNumberTwo }) => {
  return (
    <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 text-serif text-sm">
      {data?.cart?.map((item, i) => (
        <TableRow 
          key={i} 
          className="dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 dark:text-gray-400 text-left">
            {i + 1}
          </TableCell>
          <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 dark:text-gray-400">
            <span
              className={`text-gray-700 font-semibold dark:text-gray-300 text-md ${
                item.title.length > 15 ? "wrap-long-title" : ""
              }`}
            >
              {item.title}
            </span>
          </TableCell>
          <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center text-gray-600 dark:text-gray-300">
            {item.quantity}
          </TableCell>
          <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center text-gray-600 dark:text-gray-300">
            {currency}
            {getNumberTwo((item.price * 100) / (100 + (item.prices?.gst ?? 0)))}
          </TableCell>
          <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center text-gray-600 dark:text-gray-300">
            {getNumberTwo(item.prices?.gst ?? 0)}
            {" %"}
          </TableCell>
          <TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-red-500 dark:text-emerald-400">
            {currency}
            {getNumberTwo(item.itemTotal)}
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default OrderedbyTable;
