// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import Spinner from "../../components/spinner";
// import {
//   useInitiateStkPushMutation,
//   useMpesaCallbackMutation,
// } from "./EmpesaAPI";

// const safGreen = "#00A82D";
// const safGrey = "#4A4A4A";

// const MpesaPaymentPage = () => {
//   const [phone, setPhone] = useState("");
//   const [amount, setAmount] = useState(1);

//   const [stkPush, { isLoading: isPushing }] = useInitiateStkPushMutation();
//   const [simulateCallback, { isLoading: isSimulating }] =
//     useMpesaCallbackMutation();

//   const handlePay = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!/^2547\d{8}$/.test(phone)) {
//       toast.error("Enter phone in format 2547XXXXXXXX");
//       return;
//     }

//     if (amount < 1) {
//       toast.error("Amount must be at least 1");
//       return;
//     }

//     // ✅ Get order ID from localStorage
//     const storedOrder = localStorage.getItem("currentOrder");
//     const order = storedOrder ? JSON.parse(storedOrder) : null;
//     const orderId = order?.id;

//     if (!orderId) {
//       toast.error("Order not found in local storage");
//       return;
//     }

//     const toastId = toast.loading("Sending STK push…");
//     try {
//       await stkPush({ phone, amount, order_id: Number(orderId) }).unwrap();
//       toast.success("Check your phone to complete payment", { id: toastId });
//     } catch (error) {
//       console.error("STK Push error:", error);
//       toast.error("Failed to initiate payment", { id: toastId });
//     }
//   };

//   const handleSimulate = async () => {
//     const sample = {
//       Body: {
//         stkCallback: {
//           MerchantRequestID: "12345",
//           CheckoutRequestID: "ws_CO_demo",
//           ResultCode: 0,
//           ResultDesc: "Success",
//           CallbackMetadata: {
//             Item: [
//               { Name: "Amount", Value: amount },
//               { Name: "MpesaReceiptNumber", Value: "TEST123ABC" },
//               { Name: "PhoneNumber", Value: Number(phone) },
//             ],
//           },
//         },
//       },
//     } as any;

//     try {
//       await simulateCallback(sample);
//       toast.success("Callback simulated");
//     } catch (error) {
//       console.error("Simulation error:", error);
//       toast.error("Failed to simulate callback");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
//         <h1
//           className="text-2xl font-extrabold text-center"
//           style={{ color: safGreen }}
//         >
//           Lipa na M‑PESA
//         </h1>

//         <form onSubmit={handlePay} className="space-y-4">
//           <div>
//             <label
//               className="block text-sm font-medium mb-1"
//               style={{ color: safGrey }}
//             >
//               Phone Number (2547XXXXXXXX)
//             </label>
//             <input
//               type="text"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
//               placeholder="2547XXXXXXXX"
//               required
//             />
//           </div>

//           <div>
//             <label
//               className="block text-sm font-medium mb-1"
//               style={{ color: safGrey }}
//             >
//               Amount (KES)
//             </label>
//             <input
//               type="number"
//               min={1}
//               value={amount}
//               onChange={(e) => setAmount(Number(e.target.value))}
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isPushing}
//             className="w-full flex justify-center items-center gap-2 py-2 rounded-lg text-white font-semibold shadow-lg transition-transform active:scale-95"
//             style={{ background: safGreen }}
//           >
//             {isPushing && <Spinner size={20} />}
//             {isPushing ? "Sending…" : "Pay Now"}
//           </button>
//         </form>

//         <button
//           type="button"
//           onClick={handleSimulate}
//           disabled={isSimulating}
//           className="text-xs underline text-center block mx-auto"
//         >
//           {isSimulating ? "Simulating…" : "Simulate Callback (sandbox)"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MpesaPaymentPage;




import { useState } from "react";
import { toast } from "react-hot-toast";
import Spinner from "../../components/spinner";
import {
  useInitiateStkPushMutation,
  useMpesaCallbackMutation,
} from "./EmpesaAPI";

const safGreen = "#00A82D";
const safGrey = "#4A4A4A";

const MpesaPaymentPage = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(1);

  const [stkPush, { isLoading: isPushing }] = useInitiateStkPushMutation();
  const [simulateCallback, { isLoading: isSimulating }] =
    useMpesaCallbackMutation();

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^2547\d{8}$/.test(phone)) {
      toast.error("Enter phone in format 2547XXXXXXXX");
      return;
    }

    if (amount < 1) {
      toast.error("Amount must be at least 1");
      return;
    }

    const storedOrder = localStorage.getItem("currentOrder");
    const order = storedOrder ? JSON.parse(storedOrder) : null;
    const orderId = order?.id;

    if (!orderId) {
      toast.error("Order not found in local storage");
      return;
    }

    const toastId = toast.loading("Sending STK push…");
    try {
      await stkPush({ phone, amount, order_id: Number(orderId) }).unwrap();
      toast.success("Check your phone to complete payment", { id: toastId });
    } catch (error) {
      console.error("STK Push error:", error);
      toast.error("Failed to initiate payment", { id: toastId });
    }
  };

  const handleSimulate = async () => {
    const sample = {
      Body: {
        stkCallback: {
          MerchantRequestID: "12345",
          CheckoutRequestID: "ws_CO_demo",
          ResultCode: 0,
          ResultDesc: "Success",
          CallbackMetadata: {
            Item: [
              { Name: "Amount", Value: amount },
              { Name: "MpesaReceiptNumber", Value: "TEST123ABC" },
              { Name: "PhoneNumber", Value: Number(phone) },
            ],
          },
        },
      },
    } as any;

    try {
      await simulateCallback(sample);
      toast.success("Callback simulated");
    } catch (error) {
      console.error("Simulation error:", error);
      toast.error("Failed to simulate callback");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1
          className="text-2xl font-extrabold text-center"
          style={{ color: safGreen }}
        >
          Lipa na M‑PESA
        </h1>

        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: safGrey }}
            >
              Phone Number (2547XXXXXXXX)
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="2547XXXXXXXX"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              style={{ color: safGrey }}
            >
              Amount (KES)
            </label>
            <input
              type="number"
              min={1}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPushing}
            className="w-full flex justify-center items-center gap-2 py-2 rounded-lg text-white font-semibold shadow-lg transition-transform active:scale-95"
            style={{ background: safGreen }}
          >
            {isPushing && <Spinner />}
            {isPushing ? "Sending…" : "Pay Now"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleSimulate}
          disabled={isSimulating}
          className="text-xs underline text-center block mx-auto"
        >
          {isSimulating ? "Simulating…" : "Simulate Callback (sandbox)"}
        </button>
      </div>
    </div>
  );
};

export default MpesaPaymentPage;
