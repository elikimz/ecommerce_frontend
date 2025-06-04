

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import { useAddCartItemMutation } from "../features/Cart&CartItems/cartitemsAPI"
import Spinner from "../components/spinner";
import { toast } from "react-toastify"; // ✅ Adjust based on your toast library

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError } = useGetProductsQuery({});
  const [addToCart, { isLoading: isAdding }] = useAddCartItemMutation(); // ✅ track add-to-cart loading

  const product = products.find((p) => p.id === Number(id));

  useEffect(() => {
    if (product) {
      localStorage.setItem(
        "selectedProduct",
        JSON.stringify({
          id: product.id,
          price: product.price,
        })
      );
    }
  }, [product]);

  if (isLoading) return <Spinner />;

  if (!product || isError)
    return (
      <p className="p-6 text-center text-lg text-red-500">
        Product not found or failed to load.
      </p>
    );

  const handleAddToCart = async () => {
    try {
      await addToCart({ product_id: product.id, quantity: 1 }).unwrap();
      toast.success("✅ Product added to cart!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      toast.error("❌ Failed to add product to cart.");
    }
  };

  const handleOrderNow = () => {
    navigate("/orders/new", { state: { product } });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Section */}
        <div className="w-full h-[450px] bg-gray-100 rounded-xl overflow-hidden shadow-sm">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-contain p-6"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-yellow-500 text-lg">★★★★☆</div>
              <span className="text-sm text-gray-500">(24 reviews)</span>
            </div>
            <p className="text-gray-600 text-base mb-4">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-orange-500 mb-2">
              KES {product.price.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              Category: {product.category?.name}
            </p>
            <p className="text-sm text-gray-500">In stock: {product.stock}</p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition shadow flex items-center justify-center"
            >
              {isAdding ? (
                <Spinner  /> // ✅ use your small spinner inside button
              ) : (
                "Add to Cart"
              )}
            </button>
            <button
              onClick={handleOrderNow}
              className="flex-1 px-6 py-3 bg-gray-900 hover:bg-black text-white rounded-xl transition shadow"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

