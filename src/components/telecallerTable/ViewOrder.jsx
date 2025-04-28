// ViewOrder.jsx
import { useParams } from "react-router";
import React, { useContext, useRef, useState, useEffect } from "react";
import {
  TableCell,
  TableHeader,
  Table,
  TableContainer,
  WindmillContext,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { PDFDownloadLink } from "@react-pdf/renderer";

//internal import
import useAsync from "@/hooks/useAsync";
import useError from "@/hooks/useError";
import Status from "@/components/table/Status";
import { notifyError, notifySuccess } from "@/utils/toast";
import { AdminContext } from "@/context/AdminContext";
import OrderServices from "@/services/OrderServices";
import Loading from "@/components/preloader/Loading";

import PageTitle from "@/components/Typography/PageTitle";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import TelecallerOrderTable from "./TelecallerOrderTable";

const ViewOrder = ({ staffId, onClose }) => {
  const { t } = useTranslation();
  const { state } = useContext(AdminContext);
  const id = staffId;
  const printRef = useRef();

  // Add pagination state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10); // Default limit
  const [telecallerData, setTelecallerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { currency, globalSetting, showDateFormat, getNumberTwo } =
    useUtilsFunction();

  // Fetch data with pagination
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {
          page: page,
          limit: limit,
        };

        const result = await OrderServices.getTelecallerOrderById(id, params);
        console.log("telecaller data", result);
        setTelecallerData(result.data);
        setError(null);
      } catch (err) {
        setError(err.message || "An error occurred while fetching the data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, page, limit]);

  // Check if there are orders to display
  const hasOrders = telecallerData?.orders && telecallerData?.orders?.length > 0;
  const totalPages = telecallerData?.pagination?.totalPages || 0;

  return (
    <>
      <PageTitle>Telecaller Details</PageTitle>

      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 rounded-xl shadow-sm overflow-hidden"
      >
        {/* Show telecaller basic info */}
        {telecallerData && !loading && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-2">
              Telecaller Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {telecallerData.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {telecallerData.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {telecallerData.mobile}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">City:</span>{" "}
                  {telecallerData.city}
                </p>
                <p>
                  <span className="font-medium">State:</span>{" "}
                  {telecallerData.state}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      telecallerData.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {telecallerData.status}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Account Holder:</span>{" "}
                  {telecallerData.accountHolderName}
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  {telecallerData.bankAccNumber}
                </p>
                <p>
                  <span className="font-medium">IFSC:</span>{" "}
                  {telecallerData.IFSC}
                </p>
              </div>
            </div>
          </div>
        )}

        <h3 className="text-lg font-semibold p-4">Order History</h3>

        <div>
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <span className="text-center mx-auto text-red-500 block p-4">
              {error}
            </span>
          ) : (
            <TableContainer className="my-4 max-h-[225px] lg:max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{t("Sr")}</TableCell>
                    <TableCell>Product Title</TableCell>
                    <TableCell className="text-center">
                      {t("Quantity")}
                    </TableCell>
                    <TableCell className="text-center">
                      {t("ItemPrice")}
                    </TableCell>
                    <TableCell className="text-center">{"GST"}</TableCell>
                    <TableCell className="text-center">{"Phone"}</TableCell>
                    <TableCell className="text-center">{"Email"}</TableCell>
                    <TableCell className="text-center">{"Name"}</TableCell>
                    <TableCell className="text-center">
                      {"Ordered By"}
                    </TableCell>
                    <TableCell className="text-right">{"Amount"}</TableCell>
                  </tr>
                </TableHeader>
                <TelecallerOrderTable
                  orders={telecallerData?.orders || []}
                  currency={currency}
                  getNumberTwo={getNumberTwo}
                />
              </Table>
            </TableContainer>
          )}
        </div>

        {/* Show order summary only if there are orders */}
        {!loading && telecallerData && hasOrders && (
          <div className="border rounded-xl border-gray-100 p-3 m-4 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex lg:flex-row md:flex-row flex-col justify-around">
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block text-center">
                  Commission Earned
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 font-semibold font-serif block text-center">
                  {currency}
                  {getNumberTwo(telecallerData.commission || 0)}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block text-center">
                  Remaining Balance
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-400 font-semibold font-serif block text-center">
                  {currency}
                  {getNumberTwo(telecallerData.remainingBalance || 0)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block text-center">
                  Total Orders
                </span>
                <span className="text-lg font-serif font-bold text-red-500 dark:text-emerald-500 block text-center">
                  {telecallerData?.pagination?.totalOrders || 0}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Add pagination controls */}
        {!loading && telecallerData && (
          <div className="flex justify-between items-center p-4">
            <button
              onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages || 1}
            </span>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewOrder;
