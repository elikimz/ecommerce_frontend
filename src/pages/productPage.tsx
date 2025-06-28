// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGetProductsQuery } from "../features/Products/productsAPI";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Spinner from "../components/spinner";

// const ProductPage: React.FC = () => {
//   const { productId } = useParams<{ productId: string }>();
//   const { data: products = [], isLoading, error } = useGetProductsQuery({});

//   // Convert productId to a number for comparison
//   const numericProductId = Number(productId);
//   const product = products.find((p) => p.id === numericProductId);

//   // Debug logs
//   console.log("Product ID from URL:", productId);
//   console.log("All Products:", products);
//   console.log("Matched Product:", product);

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Navbar />

//       <main className="max-w-5xl mx-auto px-4 py-10 flex-grow">
//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[50vh]">
//             <Spinner />
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500">
//             Failed to load product. Please try again later.
//           </p>
//         ) : !product ? (
//           <p className="text-center text-gray-500">Product not found.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <img
//               src={product.image_url}
//               alt={product.name}
//               className="w-full h-[400px] object-cover rounded-xl shadow"
//             />
//             <div>
//               <h1 className="text-3xl font-bold text-gray-800 mb-2">
//                 {product.name}
//               </h1>
//               <p className="text-gray-500 mb-4">
//                 Category: {product.category?.name || "Uncategorized"}
//               </p>
//               <p className="text-orange-600 text-2xl font-bold mb-4">
//                 KES {product.price.toLocaleString()}
//               </p>
//               <p className="text-gray-700 mb-4">{product.description}</p>

//               {product.colors && (
//                 <p className="text-sm text-gray-600">
//                   <strong>Colors:</strong> {product.colors}
//                 </p>
//               )}
//               {product.warranty && (
//                 <p className="text-sm text-gray-600">
//                   <strong>Warranty:</strong> {product.warranty}
//                 </p>
//               )}
//               {product.stock !== undefined && (
//                 <p
//                   className={`mt-4 text-sm font-semibold ${
//                     product.stock > 0 ? "text-green-600" : "text-red-500"
//                   }`}
//                 >
//                   {product.stock > 0
//                     ? `${product.stock} in stock`
//                     : "Out of stock"}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ProductPage;



import React from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/spinner";
import { Helmet } from "react-helmet";

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: products = [], isLoading, error } = useGetProductsQuery({});

  const numericProductId = Number(productId);
  const product = products.find((p) => p.id === numericProductId);

  // Debug logs
  console.log("Product ID from URL:", productId);
  console.log("All Products:", products);
  console.log("Matched Product:", product);

  const schemaMarkup = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        image: [product.image_url],
        description: product.description,
        sku: `SKU-${product.id}`,
        brand: {
          "@type": "Brand",
          name: "Smart Indoor Decors",
        },
        offers: {
          "@type": "Offer",
          url: `https://www.smartindoordecors.com/product/${product.id}`,
          priceCurrency: "KES",
          price: product.price,
          itemCondition: "https://schema.org/NewCondition",
          availability:
            product.stock && product.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
        },
      }
    : null;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {product && (
        <Helmet>
          <title>{product.name} | Smart Indoor Decors</title>
          <meta
            name="description"
            content={product.description.slice(0, 160)}
          />
          <link
            rel="canonical"
            href={`https://www.smartindoordecors.com/product/${product.id}`}
          />
          <script type="application/ld+json">
            {JSON.stringify(schemaMarkup)}
          </script>
        </Helmet>
      )}

      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10 flex-grow">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">
            Failed to load product. Please try again later.
          </p>
        ) : !product ? (
          <p className="text-center text-gray-500">Product not found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-xl shadow"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-500 mb-4">
                Category: {product.category?.name || "Uncategorized"}
              </p>
              <p className="text-orange-600 text-2xl font-bold mb-4">
                KES {product.price.toLocaleString()}
              </p>
              <p className="text-gray-700 mb-4">{product.description}</p>

              {product.colors && (
                <p className="text-sm text-gray-600">
                  <strong>Colors:</strong> {product.colors}
                </p>
              )}
              {product.warranty && (
                <p className="text-sm text-gray-600">
                  <strong>Warranty:</strong> {product.warranty}
                </p>
              )}
              {product.stock !== undefined && (
                <p
                  className={`mt-4 text-sm font-semibold ${
                    product.stock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </p>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
