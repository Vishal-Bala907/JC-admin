import React, { useContext, useRef, useState } from "react";

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
import OrderedbyTable from "./OrderedbyTable";



const OrderedBy = ({ orderId, onClose }) => {
  const { t } = useTranslation();

  const { state } = useContext(AdminContext);

  // const { id } = useParams();
    const id = orderId;
  const printRef = useRef();

  const { data, loading, error } = useAsync(() =>
    OrderServices.getOrderById(id)
  );

  // console.log("data", data);

  const { currency, globalSetting, showDateFormat, getNumberTwo } =
    useUtilsFunction();

  return (
    <div >
      <div className="p-4">
      <PageTitle> Order Details </PageTitle>
      </div>
      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 rounded-xl shadow-sm overflow-hidden"
      >
        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <span className="text-center mx-auto text-red-500">{error}</span>
        ) : (
          <>
            {/* Add Customer Information Section */}
            <div className="p-4 border-b dark:border-gray-700 shadow-md rounded-xl">
              <h3 className="text-lg font-semibold md:mb-3 mt-6 mb-2">Customer Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ordered By</p>
                  <p className="font-semibold">{data?.orderedBy?.role ?? 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                  <p className="font-semibold">{data?.orderedBy?.name ?? 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="font-semibold">{data?.orderedBy?.contact ?? 'N/A'}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <p className="font-semibold">{data?.orderedBy?.email ?? 'N/A'}</p>
                </div>
              </div>
            </div>

            <TableContainer className="my-8 max-h-[225px] lg:max-h-[400px] overflow-y-auto">
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
                    <TableCell className="text-right">{"Amount"}</TableCell>
                  </tr>
                </TableHeader>
                <OrderedbyTable
                  data={data}
                  currency={currency}
                  getNumberTwo={getNumberTwo}
                />
              </Table>
            </TableContainer>
          </>
        )}
        
        {!loading && (
          <div className="border rounded-xl border-gray-100 p-3 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex lg:flex-row md:flex-row flex-col justify-around">
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block text-center">
                  {t("InvoicepaymentMethod")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block text-center">
                  {data.paymentMethod}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block text-center">
                  {t("ShippingCost")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block text-center">
                  {currency}
                  {getNumberTwo(data.shippingCost)}
                </span>
              </div>
              <div className="mb-3 md:mb-0 px-3 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block text-center">
                  {t("InvoiceDicount")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block text-center">
                  {currency}
                  {getNumberTwo(data.discount)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block text-center">
                  {t("InvoiceTotalAmount")}
                </span>
                <span className="text-lg font-serif font-bold text-red-500 dark:text-emerald-500 block text-center">
                  {currency}
                  {getNumberTwo(data.total)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderedBy;
