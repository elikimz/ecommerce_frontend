import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../features/Orders/orderAPI";
import { Loader2 } from "lucide-react";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

const ReceiptPage: React.FC = () => {
  const { orderId } = useParams();
  const receiptRef = useRef<HTMLDivElement>(null);

  const {
    data: order,
    isLoading,
    isError,
  } = useGetOrderByIdQuery(orderId ?? "");
  

  const formatMoney = (num: number) =>
    `KES ${num.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      const dataUrl = await domtoimage.toPng(receiptRef.current);
      const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4" });

      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = (img.height * imgWidth) / img.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`SmartIndoorDecors-Receipt-${orderId}.pdf`);
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="h-screen flex items-center justify-center text-red-600">
        Failed to load receipt.
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* RECEIPT CARD */}
      <div
        ref={receiptRef}
        className="bg-white border border-gray-300 rounded-md w-full max-w-3xl p-6 text-gray-800 shadow-md"
      >
        {/* Logo & Brand */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <img
            src="/logo.png"
            alt="Smart Indoor Decors"
            className="w-12 h-12 object-contain"
          />
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-700">
              Smart Indoor Decors
            </h2>
            <p className="text-xs text-gray-500">Your Home, Our Touch</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold text-center text-orange-600 mb-4">
          Official Receipt
        </h1>

        {/* Customer & Order */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="font-semibold">Customer Details</p>
            <p>{order.customer_name}</p>
            <p>{order.customer_email}</p>
            <p>{order.customer_phone}</p>
            <p>{order.shipping_address}</p>
          </div>
          <div>
            <p className="font-semibold">Order Details</p>
            <p>Order ID: #{order.id}</p>
            <p>Status: {order.status}</p>
            <p>
              Date:{" "}
              {new Date(order.created_at).toLocaleDateString("en-KE", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p>Total: {formatMoney(order.total_amount)}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-xs border border-gray-300">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border px-2 py-1 text-left">Product</th>
              <th className="border px-2 py-1 text-center">Qty</th>
              <th className="border px-2 py-1 text-right">Price</th>
              <th className="border px-2 py-1 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.order_items.map((item: any, index: number) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="border px-2 py-1">
                  {item.product?.name ?? `#${item.product_id}`}
                </td>
                <td className="border px-2 py-1 text-center">
                  {item.quantity}
                </td>
                <td className="border px-2 py-1 text-right">
                  {formatMoney(item.price)}
                </td>
                <td className="border px-2 py-1 text-right">
                  {formatMoney(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-4 text-right text-sm font-bold">
          Grand Total: {formatMoney(order.total_amount)}
        </div>

        {/* Thank You */}
        <p className="mt-6 text-center text-xs text-gray-600 italic">
          Thank you for shopping with Smart Indoor Decors!
        </p>

        {/* Contact Info */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          📞 +254&nbsp;741&nbsp;769&nbsp;787 | 📧 smartindoordecors@gmail.com
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadReceipt}
        className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default ReceiptPage;
