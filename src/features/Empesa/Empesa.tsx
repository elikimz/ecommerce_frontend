import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../../components/spinner";
import { useInitiateStkPushMutation } from "./EmpesaAPI";

const safGreen = "#00A82D";
const safGrey = "#4A4A4A";

const MpesaPaymentPage = () => {
  const [phoneSuffix, setPhoneSuffix] = useState("7"); // user types 7XXXXXXXX
  const [amount, setAmount] = useState(0);
  const [orderId, setOrderId] = useState<number | null>(null);
  const navigate = useNavigate();

  const [stkPush, { isLoading: isPushing }] = useInitiateStkPushMutation();

  // Get order from localStorage on mount
  useEffect(() => {
    const storedOrder = localStorage.getItem("currentOrder");
    if (storedOrder) {
      try {
        const order = JSON.parse(storedOrder);
        setAmount(order.total_amount || 0);
        setOrderId(order.id);
      } catch (err) {
        toast.error("Invalid order format in local storage");
      }
    } else {
      toast.error("Order not found in local storage");
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // only digits
    if (value.length <= 9) setPhoneSuffix(value);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = `254${phoneSuffix}`;

    if (!/^2547\d{8}$/.test(fullPhone)) {
      toast.error("Enter a valid Safaricom number (starts with 7...)");
      return;
    }

    if (!orderId) {
      toast.error("Order ID not found");
      return;
    }

    const toastId = toast.loading("Sending STK push…");

    try {
      console.log("STK Push data:", {
        phone: fullPhone,
        amount,
        order_id: orderId,
      });
      await stkPush({ phone: fullPhone, amount, order_id: orderId }).unwrap();
      toast.success("Check your phone to complete payment", { id: toastId });
      navigate("/success");
    } catch (error) {
      console.error("STK Push error:", error);
      toast.error("Failed to initiate payment", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-xs bg-white rounded-lg shadow-md p-4 space-y-4">
        <h1
          className="text-xl font-bold text-center"
          style={{ color: safGreen }}
        >
          Lipa na M-PESA
        </h1>

        <form onSubmit={handlePay} className="space-y-3">
          {/* Phone Number */}
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: safGrey }}
            >
              Phone Number (e.g. 712345678)
            </label>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 px-2 py-1 rounded text-sm">254</span>
              <input
                type="text"
                value={phoneSuffix}
                onChange={handlePhoneChange}
                className="w-full border rounded px-2 py-1 text-sm focus:outline-none focus:ring"
                placeholder="7XXXXXXXX"
                maxLength={9}
                required
              />
            </div>
          </div>

          {/* Amount */}
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

          {/* Pay Button */}
          <button
            type="submit"
            disabled={isPushing}
            className="w-full flex justify-center items-center gap-2 py-2 rounded text-white font-semibold shadow transition-transform active:scale-95"
            style={{ background: safGreen }}
          >
            {isPushing && <Spinner />}
            {isPushing ? "Sending…" : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MpesaPaymentPage;
