

// import React, { useState, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   useCreateProductMutation,
//   useGetProductsQuery,
//   useUpdateProductByIdMutation,
//   useDeleteProductByIdMutation,
// } from "./productsAPI";
// import { useAddCartItemMutation } from "../Cart&CartItems/cartitemsAPI";

// interface Category {
//   id: number;
//   name: string;
//   description: string;
//   created_at: string;
//   updated_at: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   description?: string;
//   price: number;
//   category_id: number;
//   stock: number;
//   image_url?: string;
//   created_at: string;
//   updated_at: string;
//   category?: Category;
// }

// interface ProductForm {
//   name: string;
//   description?: string;
//   price: number | "";
//   category_id: number | "";
//   stock: number | "";
//   image_url?: string;
// }

// const initialForm: ProductForm = {
//   name: "",
//   description: "",
//   price: "",
//   category_id: "",
//   stock: "",
//   image_url: "",
// };

// const formatDate = (dateStr: string) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

// const Product: React.FC = () => {
//   const [formData, setFormData] = useState<ProductForm>(initialForm);
//   const [selectedProductId, setSelectedProductId] = useState<number | null>(
//     null
//   );
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

//   const {
//     data: products = [],
//     error: getError,
//     isLoading,
//   } = useGetProductsQuery({});

//   const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
//   const [updateProduct, { isLoading: isUpdating }] =
//     useUpdateProductByIdMutation();
//   const [deleteProduct] = useDeleteProductByIdMutation();

//   const [addToCart, { isLoading: isAddingToCart }] = useAddCartItemMutation();

//   useEffect(() => {
//     if (selectedProductId === null) {
//       setFormData(initialForm);
//       setPreviewImage(null);
//     } else if (products) {
//       const product = products.find((p) => p.id === selectedProductId);
//       if (product) {
//         setFormData({
//           name: product.name,
//           description: product.description,
//           price: product.price,
//           category_id: product.category_id,
//           stock: product.stock,
//           image_url: product.image_url || "",
//         });
//         setPreviewImage(product.image_url || null);
//       }
//     }
//   }, [products, selectedProductId]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     const parsedValue =
//       name === "price" || name === "stock" || name === "category_id"
//         ? value === ""
//           ? ""
//           : Number(value)
//         : value;
//     setFormData((prev) => ({ ...prev, [name]: parsedValue }));
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (reader.result) {
//         setFormData((prev) => ({
//           ...prev,
//           image_url: reader.result as string,
//         }));
//         setPreviewImage(reader.result as string);
//       }
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (formData.category_id === "" || formData.category_id <= 0)
//       return toast.error("Invalid Category ID");
//     if (formData.stock === "" || formData.stock < 0)
//       return toast.error("Stock cannot be negative");
//     if (formData.price === "" || formData.price < 0)
//       return toast.error("Price cannot be negative");

//     try {
//       if (selectedProductId) {
//         await updateProduct({ id: selectedProductId, body: formData }).unwrap();
//         toast.success("Product updated successfully!");
//       } else {
//         await createProduct(formData).unwrap();
//         toast.success("Product created successfully!");
//       }
//       setFormData(initialForm);
//       setSelectedProductId(null);
//       setPreviewImage(null);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to save product");
//     }
//   };

//   const handleEdit = (product: Product) => {
//     setSelectedProductId(product.id);
//   };

//   const confirmDeleteProduct = async () => {
//     if (confirmDeleteId !== null) {
//       try {
//         await deleteProduct(confirmDeleteId).unwrap();
//         toast.success("Product deleted successfully!");
//       } catch {
//         toast.error("Failed to delete product");
//       }
//       setConfirmDeleteId(null);
//     }
//   };

//   const handleAddToCart = async (product: Product) => {
//     try {
//       await addToCart({ product_id: product.id, quantity: 1 }).unwrap();
//       toast.success(`${product.name} added to cart!`);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to add to cart.");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
//       <Toaster position="top-center" reverseOrder={false} />
//       <h2 className="text-4xl font-bold mb-8 text-orange-600">
//         Products Management
//       </h2>

//       <form
//         onSubmit={handleSubmit}
//         className="mb-12 border border-orange-300 p-8 rounded-lg shadow-lg bg-white"
//       >
//         <h3 className="text-2xl font-semibold mb-6 text-orange-700">
//           {selectedProductId ? "Update Product" : "Create New Product"}
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//           <div>
//             <label className="block font-medium mb-2">Name *</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//               placeholder="Enter product name"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-2">Price (KES) *</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//               min={0}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//               placeholder="Enter price"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-2">Category ID *</label>
//             <input
//               type="number"
//               name="category_id"
//               value={formData.category_id}
//               onChange={handleChange}
//               required
//               min={1}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//               placeholder="Enter category ID"
//             />
//           </div>

//           <div>
//             <label className="block font-medium mb-2">Stock Quantity *</label>
//             <input
//               type="number"
//               name="stock"
//               value={formData.stock}
//               onChange={handleChange}
//               required
//               min={0}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//               placeholder="Enter available stock"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block font-medium mb-2">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={3}
//               className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
//               placeholder="Enter product description (optional)"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="block font-medium mb-2">Product Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="mb-4"
//               aria-label="Upload product image"
//             />
//             {previewImage && (
//               <img
//                 src={previewImage}
//                 alt="Preview"
//                 className="max-w-xs rounded-lg shadow-md"
//               />
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isCreating || isUpdating}
//           className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
//         >
//           {selectedProductId
//             ? isUpdating
//               ? "Updating..."
//               : "Update Product"
//             : isCreating
//             ? "Creating..."
//             : "Create Product"}
//         </button>

//         {selectedProductId && (
//           <button
//             type="button"
//             onClick={() => setSelectedProductId(null)}
//             className="mt-3 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
//           >
//             Cancel Edit
//           </button>
//         )}
//       </form>

//       <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-orange-300">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-orange-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Description
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Price (KES)
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Category
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Stock
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Created At
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Updated At
//               </th>
//               <th className="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {isLoading && (
//               <tr>
//                 <td colSpan={8} className="text-center py-8">
//                   Loading products...
//                 </td>
//               </tr>
//             )}
//             {getError && (
//               <tr>
//                 <td colSpan={8} className="text-center py-8 text-red-600">
//                   Error loading products.
//                 </td>
//               </tr>
//             )}
//             {!isLoading && products?.length === 0 && (
//               <tr>
//                 <td colSpan={8} className="text-center py-8 text-gray-600">
//                   No products found.
//                 </td>
//               </tr>
//             )}
//             {products?.map((product) => (
//               <tr key={product.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {product.name}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
//                   {product.description || "-"}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {product.price.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {product.category?.name || `ID: ${product.category_id}`}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   {product.stock}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {formatDate(product.created_at)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                   {formatDate(product.updated_at)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center space-x-1">
//                   <button
//                     onClick={() => handleEdit(product)}
//                     className="px-3 py-1 bg-orange-400 hover:bg-orange-500 text-white rounded transition"
//                     aria-label={`Edit ${product.name}`}
//                     type="button"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => setConfirmDeleteId(product.id)}
//                     className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition"
//                     aria-label={`Delete ${product.name}`}
//                     type="button"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleAddToCart(product)}
//                     disabled={isAddingToCart}
//                     className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
//                     aria-label={`Add ${product.name} to cart`}
//                   >
//                     {isAddingToCart ? "Adding..." : "Add to Cart"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {confirmDeleteId !== null && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="delete-confirmation-title"
//         >
//           <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
//             <h3
//               id="delete-confirmation-title"
//               className="text-xl font-semibold mb-6 text-red-600"
//             >
//               Confirm Delete
//             </h3>
//             <p className="mb-8 text-gray-700">
//               Are you sure you want to delete this product? This action cannot
//               be undone.
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setConfirmDeleteId(null)}
//                 className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
//                 type="button"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDeleteProduct}
//                 className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
//                 type="button"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Product;

