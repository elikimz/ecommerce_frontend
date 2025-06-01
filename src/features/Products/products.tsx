import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useUpdateProductByIdMutation,
  useDeleteProductByIdMutation,
} from "./productsAPI";

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category_id: number;
  stock: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
}

interface ProductForm {
  name: string;
  description?: string;
  price: number | "";
  category_id: number | "";
  stock: number | "";
  image_url?: string;
}

const initialForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  category_id: "",
  stock: "",
  image_url: "",
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const Product: React.FC = () => {
  const [formData, setFormData] = useState<ProductForm>(initialForm);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const { data: products, error: getError, isLoading } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] =
    useUpdateProductByIdMutation();
  const [deleteProduct, { isLoading: isDeleting }] =
    useDeleteProductByIdMutation();

  useEffect(() => {
    if (!selectedProductId) {
      setFormData(initialForm);
      setPreviewImage(null);
    }
  }, [products, selectedProductId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "price" || name === "stock" || name === "category_id"
        ? value === ""
          ? ""
          : Number(value)
        : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setFormData((prev) => ({
          ...prev,
          image_url: reader.result as string,
        }));
        setPreviewImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.category_id === "" || formData.category_id <= 0)
      return toast.error("Invalid Category ID");
    if (formData.stock === "" || formData.stock < 0)
      return toast.error("Stock cannot be negative");
    if (formData.price === "" || formData.price < 0)
      return toast.error("Price cannot be negative");

    try {
      if (selectedProductId) {
        await updateProduct({ id: selectedProductId, body: formData }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await createProduct(formData).unwrap();
        toast.success("Product created successfully!");
      }
      setFormData(initialForm);
      setSelectedProductId(null);
      setPreviewImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProductId(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category_id: product.category_id,
      stock: product.stock,
      image_url: product.image_url || "",
    });
    setPreviewImage(product.image_url || null);
  };

  const confirmDeleteProduct = async () => {
    if (confirmDeleteId !== null) {
      try {
        await deleteProduct(confirmDeleteId).unwrap();
        toast.success("Product deleted successfully!");
      } catch {
        toast.error("Failed to delete product");
      }
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="text-4xl font-bold mb-8 text-orange-600">
        Products Management
      </h2>

      {/* Product Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-12 border border-orange-300 p-8 rounded-lg shadow-lg bg-white"
      >
        <h3 className="text-2xl font-semibold mb-6 text-orange-700">
          {selectedProductId ? "Update Product" : "Create New Product"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block font-medium mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Price (KES) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min={0}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Category ID *</label>
            <input
              type="number"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              required
              min={1}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter category ID"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min={0}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter available stock"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Brief product description"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Upload Image</label>
            <label className="cursor-pointer bg-orange-500 text-white py-2 px-6 rounded-lg inline-block hover:bg-orange-600">
              Choose File
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          <div>
            <label className="block font-medium mb-2">Or Enter Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, image_url: e.target.value }));
                setPreviewImage(e.target.value);
              }}
              className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {previewImage && (
          <div className="mb-8">
            <p className="text-sm font-semibold mb-2">Image Preview:</p>
            <img
              src={previewImage}
              alt="Preview"
              className="h-36 rounded-lg shadow-md object-contain"
            />
          </div>
        )}

        <div className="flex gap-6">
          <button
            type="submit"
            disabled={isCreating || isUpdating}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-60 transition"
          >
            {selectedProductId
              ? isUpdating
                ? "Updating..."
                : "Update Product"
              : isCreating
              ? "Creating..."
              : "Create Product"}
          </button>

          {selectedProductId && (
            <button
              type="button"
              onClick={() => {
                setSelectedProductId(null);
                setFormData(initialForm);
                setPreviewImage(null);
              }}
              className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-100 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      <section>
        <h3 className="text-3xl font-bold mb-6 text-orange-600">
          Product Catalog
        </h3>

        {isLoading ? (
          <p className="text-gray-600">Loading products...</p>
        ) : getError ? (
          <p className="text-red-600 font-semibold">
            Error loading products. Please try again later.
          </p>
        ) : !products || products.length === 0 ? (
          <p className="text-gray-600 italic">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product: Product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <div className="mb-4 h-48 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="object-contain h-full"
                    />
                  ) : (
                    <span className="text-gray-400 italic">No image</span>
                  )}
                </div>

                <h4 className="text-xl font-bold mb-2 text-orange-700">
                  {product.name}
                </h4>

                <p className="mb-2 text-gray-700">
                  {product.description || "No description available."}
                </p>

                <p className="font-semibold text-lg mb-2 text-orange-600">
                  Price: KES {product.price.toFixed(2)}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {product.category
                    ? `${product.category.name} - ${product.category.description}`
                    : "Category info unavailable"}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Stock:</span> {product.stock}
                </p>

                <p className="mb-2 text-sm text-gray-500">
                  Created: {formatDate(product.created_at)}
                </p>

                <p className="mb-4 text-sm text-gray-500">
                  Updated: {formatDate(product.updated_at)}
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(product.id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
            <h4 className="text-xl font-semibold mb-4 text-red-600">
              Confirm Deletion
            </h4>
            <p className="mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="py-2 px-6 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProduct}
                disabled={isDeleting}
                className="py-2 px-6 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
