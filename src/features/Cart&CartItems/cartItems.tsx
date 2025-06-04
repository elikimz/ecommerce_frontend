import { toast } from "react-hot-toast";
import Spinner from "../../components/spinner";
import {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
} from "../Cart&CartItems/cartitemsAPI";

const CartPage = () => {
  const { data: cart, isLoading, refetch } = useGetCartQuery();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    const action = quantity < 1 ? "Removing item..." : "Updating quantity...";
    const toastId = toast.loading(action);

    try {
      if (quantity < 1) {
        await deleteCartItem(productId).unwrap();
        toast.success("Item removed", { id: toastId });
      } else {
        await updateCartItem({ product_id: productId, quantity }).unwrap();
        toast.success("Quantity updated", { id: toastId });
      }
      refetch();
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleRemoveItem = async (productId: number) => {
    const toastId = toast.loading("Removing item...");
    try {
      await deleteCartItem(productId).unwrap();
      toast.success("Item removed", { id: toastId });
      refetch();
    } catch (err) {
      toast.error("Failed to remove item", { id: toastId });
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>

      {isLoading && (
        <div className="flex justify-center items-center h-32">
          <Spinner />
        </div>
      )}

      {!isLoading && cart?.cart_items?.length > 0 ? (
        <ul className="space-y-4">
          {cart.cart_items.map((item: any, index: number) => (
            <li
              key={item.product_id ?? index}
              className="border p-4 rounded shadow-sm flex items-center space-x-4"
            >
              {/* Product Image */}
              {item.product?.image_url && (
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              <div className="flex-1">
                <p className="font-medium text-lg">{item.product?.name}</p>
                <p className="text-sm text-gray-500 mb-1">
                  Qty: {item.quantity}
                </p>

                <p className="text-sm text-gray-600 mb-2">
                  {item.quantity} × KES {item.product?.price} ={" "}
                  <span className="font-semibold text-orange-500">
                    KES {item.product?.price * item.quantity}
                  </span>
                </p>

                <div className="flex space-x-2">
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleUpdateQuantity(item.product_id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleUpdateQuantity(item.product_id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleRemoveItem(item.product_id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p className="text-gray-600">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
