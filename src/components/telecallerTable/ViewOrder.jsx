import { useParams } from "react-router";

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
import TelecallerOrderTable from "./TelecallerOrderTable";



const ViewOrder = ({ staffId, onClose }) => {
  const { t } = useTranslation();

  const { state } = useContext(AdminContext);

  // const { id } = useParams();
    const id = staffId;
  const printRef = useRef();

 const { data, loading, error } = useAsync(() =>
   OrderServices.getTelecallerOrderById(id, { page: 1, limit: 10 })
 );


  // console.log("data", data);

  const { currency, globalSetting, showDateFormat, getNumberTwo } =
    useUtilsFunction();

  return (
    <>
      <PageTitle> Order Details </PageTitle>

      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 rounded-xl shadow-sm overflow-hidden"
      >
        <div>
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <span className="text-center mx-auto text-red-500">{error}</span>
          ) : (
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
                  data={data}
                  currency={currency}
                  getNumberTwo={getNumberTwo}
                />
              </Table>
            </TableContainer>
          )}
        </div>

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
    </>
  );
};

export default ViewOrder;
