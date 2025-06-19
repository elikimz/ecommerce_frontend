

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  FaCreditCard,
  FaUniversity,
  FaMoneyBillWave,
  FaPaypal,
  FaMobileAlt,
} from "react-icons/fa";

const safGreen = "#00A82D";
const safGrey = "#4A4A4A";

const PAYBILL_NUMBER = "247247";
const ACCOUNT_NUMBER = "351401";

const PaybillPaymentPage = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = localStorage.getItem("currentOrder");
    if (!storedOrder) {
      toast.error("Order not found in local storage");
      return;
    }

    try {
      const order = JSON.parse(storedOrder);
      setAmount(order.total_amount ?? 0);
    } catch (err) {
      toast.error("Invalid order format in local storage");
    }
  }, []);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Use Paybill 247247, Acc No 351401 to complete payment.");
    navigate("/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Paybill Card */}
        <div className="bg-white rounded-lg shadow-md p-4 space-y-4">
          <div className="flex flex-col items-center gap-2">
            <FaMobileAlt className="text-4xl text-green-600" />
            <h1 className="text-xl font-bold" style={{ color: safGreen }}>
              Pay via M-PESA Paybill
            </h1>
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-gray-600">Paybill Number:</span>{" "}
              <span className="text-lg font-bold text-black">
                {PAYBILL_NUMBER}
              </span>
            </p>
            <p className="text-sm font-semibold text-gray-700">
              <span className="text-gray-600">Account Number:</span>{" "}
              <span className="text-lg font-bold text-black">
                {ACCOUNT_NUMBER}
              </span>
            </p>
          </div>

          <form onSubmit={handlePay} className="space-y-3">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                style={{ color: safGrey }}
              >
                Amount (KES)
              </label>
              <input
                type="number"
                value={amount}
                disabled
                className="w-full border rounded px-2 py-1 text-sm bg-gray-100 cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-2 rounded text-white font-semibold shadow transition-transform active:scale-95"
              style={{ background: safGreen }}
            >
              Confirm Payment Info
            </button>
          </form>
        </div>

        {/* Other Payment Methods - Coming Soon */}
        <div className="bg-blue-100 rounded-lg shadow-md p-4 space-y-4 text-center">
          <FaCreditCard className="mx-auto text-4xl text-blue-700" />
          <h2 className="text-lg font-bold text-blue-800">Card Payment</h2>
          <p className="text-sm text-blue-700">Coming Soon</p>
        </div>

        <div className="bg-yellow-100 rounded-lg shadow-md p-4 space-y-4 text-center">
          <FaUniversity className="mx-auto text-4xl text-yellow-800" />
          <h2 className="text-lg font-bold text-yellow-800">Bank Transfer</h2>
          <p className="text-sm text-yellow-700">Coming Soon</p>
        </div>

        <div className="bg-red-100 rounded-lg shadow-md p-4 space-y-4 text-center">
          <FaMoneyBillWave className="mx-auto text-4xl text-red-700" />
          <h2 className="text-lg font-bold text-red-700">Airtel Money</h2>
          <p className="text-sm text-red-600">Coming Soon</p>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-md p-4 space-y-4 text-center">
          <FaPaypal className="mx-auto text-4xl text-black" />
          <h2 className="text-lg font-bold text-black">PayPal</h2>
          <p className="text-sm text-gray-700">Coming Soon</p>
        </div>
      </div>
    </div>
  );
};

export default PaybillPaymentPage;
