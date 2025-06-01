"use client";

import { useState, useEffect } from "react";
import { useCreateOrderMutation } from "../features/Orders/orderAPI";
import toast from "react-hot-toast";

interface Product {
  id: number;
  price: number;
  // Add more fields if needed
}

const OrderPage = () => {
  const [shippingAddress, setShippingAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState<number | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  useEffect(() => {
    console.log("🟡 Attempting to load product info from localStorage");

    // Try to get product info as JSON string
    const storedProductStr = localStorage.getItem("selectedProduct");

    if (!storedProductStr) {
      toast.error("No product information found in local storage");
      console.warn("⚠️ selectedProduct key missing in localStorage");
      return;
    }

    try {
      const product: Product = JSON.parse(storedProductStr);

      if (
        product &&
        typeof product.id === "number" &&
        typeof product.price === "number"
      ) {
        setProductId(product.id);
        setPrice(product.price);
        console.log("🔹 Loaded product:", product);
      } else {
        toast.error("Product data in local storage is invalid");
        console.warn(
          "⚠️ Product data missing id or price fields or wrong types",
          product
        );
      }
    } catch (error) {
      toast.error("Failed to parse product data from local storage");
      console.error("❌ JSON parse error:", error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("📦 Submitting Order:");
    console.log("🔸 shippingAddress:", shippingAddress);
    console.log("🔸 productId:", productId);
    console.log("🔸 quantity:", quantity);
    console.log("🔸 unit price:", price);

    if (!shippingAddress.trim()) {
      toast.error("Please enter a shipping address");
      return;
    }

    if (!productId) {
      toast.error("Product ID is missing");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const totalAmount = price * quantity;

    const orderData = {
      total_amount: totalAmount,
      shipping_address: shippingAddress,
      status: "pending",
      order_items: [
        {
          product_id: productId,
          quantity,
          price,
        },
      ],
    };

    console.log("🧾 Final orderData:", orderData);

    try {
      await createOrder(orderData).unwrap();
      toast.success("Order placed successfully!");
      // Optionally clear form or redirect
    } catch (err) {
      console.error("❌ Failed to place order:", err);
      toast.error("Failed to place order");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "1rem" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1rem" }}
      >
        Place Order
      </h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Shipping Address</label>
          <input
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            placeholder="Enter shipping address"
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => {
              const newQty = parseInt(e.target.value);
              if (isNaN(newQty) || newQty < 1) return;
              setQuantity(newQty);
              console.log("🔁 Updated quantity:", newQty);
              console.log("🔁 Updated total:", (price * newQty).toFixed(2));
            }}
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
          />
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <strong>Unit Price:</strong> KES {price.toFixed(2)}
        </div>

        <div
          style={{ marginBottom: "1rem", color: "#f97316", fontWeight: "bold" }}
        >
          Total: KES {(price * quantity).toFixed(2)}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: "#f97316",
            color: "#fff",
            padding: "0.75rem",
            width: "100%",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderPage;
