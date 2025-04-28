import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

const TelecallerOrderTable = ({ orders, currency, getNumberTwo }) => {
  // If no orders are available
  if (!orders || orders.length === 0) {
    return (
      <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
        <TableRow className="dark:border-gray-700 dark:text-gray-400">
          <TableCell
            colSpan="10"
            className="px-6 py-4 text-center font-medium text-gray-500"
          >
            No orders found for this telecaller
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 text-serif text-sm">
      {orders.map((order, i) => (
        <React.Fragment key={i}>
          {order.cart?.map((item, j) => (
            console.log("item", item),
            console.log("j", j),
            <TableRow
              key={`${i}-${j}`}
              className="dark:border-gray-700 dark:text-gray-400"
            >
              <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500 text-left">
                {j + 1}
              </TableCell>
              <TableCell className="px-6 py-1 whitespace-nowrap font-normal text-gray-500">
                <span
                  className={`text-gray-700 font-semibold dark:text-gray-300 text-xs ${
                    item.title.length > 15 ? "wrap-long-title" : ""
                  }`}
                >
                  {item.title}
                </span>
              </TableCell>
              <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                {item.quantity}
              </TableCell>
              <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                {currency}
                {getNumberTwo(
                  (item.price * 100) / (100 + (item.prices?.gst ?? 0))
                )}
              </TableCell>
              <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                {getNumberTwo(item.prices?.gst ?? 0)}
                {" %"}
              </TableCell>

              {/*orderedBy */}
              <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                {order.orderedBy?.contact ?? "N/A"}
              </TableCell>
              <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                {order.orderedBy?.email ?? "N/A"}
              </TableCell>
              <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                {order.orderedBy?.name ?? "N/A"}
              </TableCell>
              <TableCell className="px-6 py-1 whitespace-nowrap font-bold text-center">
                {order.orderedBy?.role ?? "N/A"}
              </TableCell>

              <TableCell className="px-6 py-1 whitespace-nowrap text-right font-bold text-red-500 dark:text-emerald-500">
                {currency}
                {getNumberTwo(item.itemTotal)}
              </TableCell>
            </TableRow>
          ))}
        </React.Fragment>
      ))}
    </TableBody>
  );
};

export default TelecallerOrderTable;
