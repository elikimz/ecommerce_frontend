


// import React, { useState } from "react";
// import { Helmet } from "react-helmet";
// import { useGetProductsQuery } from "../features/Products/productsAPI";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import ProductDescriptions from "./productsDescriptions";
// import Spinner from "../components/spinner";

// interface Product {
//   id: string;
//   name: string;
//   image_url: string;
//   category?: { name: string };
//   price: number;
//   description: string;
//   colors?: string;
//   warranty?: string;
//   stock?: number;
//   images?: Array<{ url: string }>;
// }

// const buildSchema = (products: Product[]) => {
//   const organization = {
//     "@context": "https://schema.org",
//     "@type": "Organization",
//     name: "Smart Indoor Decors",
//     url: "https://www.smartindoordecors.com",
//     logo: "https://www.smartindoordecors.com/logo.png",
//     contactPoint: [
//       {
//         "@type": "ContactPoint",
//         telephone: "+254741769787",
//         contactType: "customer service",
//         areaServed: "KE",
//       },
//     ],
//   };

//   const website = {
//     "@context": "https://schema.org",
//     "@type": "WebSite",
//     name: "Smart Indoor Decors",
//     url: "https://www.smartindoordecors.com",
//     potentialAction: {
//       "@type": "SearchAction",
//       target:
//         "https://www.smartindoordecors.com/shop?search={search_term_string}",
//       "query-input": "required name=search_term_string",
//     },
//   };

//   const breadcrumb = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         item: {
//           "@id": "https://www.smartindoordecors.com/",
//           name: "Home",
//         },
//       },
//       {
//         "@type": "ListItem",
//         position: 2,
//         item: {
//           "@id": "https://www.smartindoordecors.com/shop",
//           name: "Shop",
//         },
//       },
//     ],
//   };

//   const productsSchema = products.map((p) => ({
//     "@context": "https://schema.org",
//     "@type": "Product",
//     name: p.name,
//     image: [p.image_url, ...(p.images || []).map((i) => i.url)],
//     description: p.description,
//     sku: `SKU-${p.id}`,
//     brand: {
//       "@type": "Brand",
//       name: "Smart Indoor Decors",
//     },
//     offers: {
//       "@type": "Offer",
//       url: `https://www.smartindoordecors.com/shop#product-${p.id}`,
//       priceCurrency: "KES",
//       price: p.price,
//       priceValidUntil: "2025-12-31",
//       itemCondition: "https://schema.org/NewCondition",
//       availability:
//         p.stock && p.stock > 0
//           ? "https://schema.org/InStock"
//           : "https://schema.org/OutOfStock",
//     },
//     aggregateRating: {
//       "@type": "AggregateRating",
//       ratingValue: "4.5",
//       reviewCount: "12",
//       ratingCount: "12",
//       bestRating: "5",
//       worstRating: "1",
//     },
//     review: {
//       "@type": "Review",
//       reviewRating: {
//         "@type": "Rating",
//         ratingValue: "5",
//         bestRating: "5",
//       },
//       author: {
//         "@type": "Person",
//         name: "Verified Buyer",
//       },
//     },
//   }));

//   return [organization, website, breadcrumb, ...productsSchema];
// };

// const Shop: React.FC = () => {
//   const { data: products = [], isLoading, error } = useGetProductsQuery({});
//   const [expandedProductId, setExpandedProductId] = useState<string | null>(
//     null
//   );

//   const toggleExpand = (productId: string) => {
//     setExpandedProductId(expandedProductId === productId ? null : productId);
//   };

//   const inStockProducts = products.filter(
//     (product) => product.stock && product.stock > 0
//   );

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col">
//       <Helmet>
//         <title>Shop All Products | Smart Indoor Decors</title>
//         <meta
//           name="description"
//           content="Explore high-quality home décor and lifestyle items from Smart Indoor Decors. Affordable, stylish, and delivered to your doorstep."
//         />
//         <link rel="canonical" href="https://www.smartindoordecors.com/shop" />
//         {inStockProducts.length > 0 && (
//           <script type="application/ld+json">
//             {JSON.stringify(buildSchema(inStockProducts))}
//           </script>
//         )}
//       </Helmet>

//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
//         <h1 className="text-3xl font-bold text-orange-500 mb-4 text-center">
//           Browse Our Entire Collection
//         </h1>

//         <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
//           Discover our curated selection of home décor, furniture, and lifestyle
//           items, crafted to add style and comfort to your living space. We
//           deliver across Kenya.
//         </p>

//         {isLoading ? (
//           <div className="flex justify-center items-center min-h-[50vh]">
//             <Spinner />
//           </div>
//         ) : error ? (
//           <p className="text-center text-red-500">
//             Failed to load products. Please try again later.
//           </p>
//         ) : inStockProducts.length === 0 ? (
//           <p className="text-center text-gray-500">
//             No products available at the moment. Please check back soon.
//           </p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//             {inStockProducts.map((product) => (
//               <div
//                 key={product.id}
//                 id={`product-${product.id}`}
//                 className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col"
//               >
//                 <img
//                   src={product.image_url}
//                   alt={product.name}
//                   className="rounded-t-2xl h-56 w-full object-cover"
//                 />
//                 <div className="p-4 flex-1 flex flex-col">
//                   <h2 className="text-lg font-semibold text-gray-800 truncate">
//                     {product.name}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     {product.category?.name || "Uncategorized"}
//                   </p>
//                   <p className="mt-2 text-orange-600 font-bold">
//                     KES {product.price.toLocaleString()}
//                   </p>

//                   <div
//                     className={`${
//                       expandedProductId === product.id ? "" : "hidden"
//                     }`}
//                   >
//                     <p className="mt-1 text-xs text-gray-600">
//                       {product.description}
//                     </p>
//                     {product.colors && (
//                       <p className="text-sm text-gray-600">
//                         <strong>Colors:</strong> {product.colors}
//                       </p>
//                     )}
//                     {product.warranty && (
//                       <p className="text-sm text-gray-600">
//                         <strong>Warranty:</strong> {product.warranty}
//                       </p>
//                     )}
//                   </div>

//                   <button
//                     onClick={() => toggleExpand(product.id)}
//                     className="mt-4 text-sm font-medium text-orange-600 bg-orange-100 hover:bg-orange-200 py-2 px-4 rounded-full transition w-fit self-start"
//                   >
//                     {expandedProductId === product.id
//                       ? "Show Less"
//                       : "View Details"}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="mt-12">
//           <ProductDescriptions />
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Shop;





import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDescriptions from "./productsDescriptions";
import Spinner from "../components/spinner";

interface Product {
  id: string;
  name: string;
  image_url: string;
  category?: { name: string };
  price: number;
  description: string;
  colors?: string;
  warranty?: string;
  stock?: number;
  images?: Array<{ url: string }>;
}

const buildSchema = (products: Product[]) => {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Smart Indoor Decors",
    url: "https://www.smartindoordecors.com",
    logo: "https://www.smartindoordecors.com/logo.png",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+254741769787",
        contactType: "customer service",
        areaServed: "KE",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Smart Indoor Decors",
    url: "https://www.smartindoordecors.com",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.smartindoordecors.com/shop?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://www.smartindoordecors.com/",
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": "https://www.smartindoordecors.com/shop",
          name: "Shop",
        },
      },
    ],
  };

  const productsSchema = products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [p.image_url, ...(p.images || []).map((i) => i.url)],
    description: p.description,
    sku: `SKU-${p.id}`,
    brand: {
      "@type": "Brand",
      name: "Smart Indoor Decors",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.smartindoordecors.com/shop#product-${p.id}`,
      priceCurrency: "KES",
      price: p.price,
      priceValidUntil: "2025-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        p.stock && p.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",

      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "500",
          currency: "KES",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "KE",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 4,
            unitCode: "d",
          },
        },
      },

      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "KE",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      bestRating: "5",
      ratingCount: "12",
      reviewCount: "12",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: "Verified Buyer",
      },
    },
  }));

  return [organization, website, breadcrumb, ...productsSchema];
};

const Shop: React.FC = () => {
  const { data: products = [], isLoading, error } = useGetProductsQuery({});
  const [expandedProductId, setExpandedProductId] = useState<string | null>(
    null
  );

  const toggleExpand = (productId: string) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };

  const inStockProducts = products.filter(
    (product) => product.stock && product.stock > 0
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Helmet>
        <title>Shop All Products | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Explore high-quality home décor and lifestyle items from Smart Indoor Decors. Affordable, stylish, and delivered to your doorstep."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/shop" />
        {inStockProducts.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(buildSchema(inStockProducts))}
          </script>
        )}
      </Helmet>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold text-orange-500 mb-4 text-center">
          Browse Our Entire Collection
        </h1>

        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
          Discover our curated selection of home décor, furniture, and lifestyle
          items, crafted to add style and comfort to your living space. We
          deliver across Kenya.
        </p>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spinner />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">
            Failed to load products. Please try again later.
          </p>
        ) : inStockProducts.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available at the moment. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {inStockProducts.map((product) => (
              <div
                key={product.id}
                id={`product-${product.id}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="rounded-t-2xl h-56 w-full object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {product.category?.name || "Uncategorized"}
                  </p>
                  <p className="mt-2 text-orange-600 font-bold">
                    KES {product.price.toLocaleString()}
                  </p>

                  <div
                    className={`${
                      expandedProductId === product.id ? "" : "hidden"
                    }`}
                  >
                    <p className="mt-1 text-xs text-gray-600">
                      {product.description}
                    </p>
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
                  </div>

                  <button
                    onClick={() => toggleExpand(product.id)}
                    className="mt-4 text-sm font-medium text-orange-600 bg-orange-100 hover:bg-orange-200 py-2 px-4 rounded-full transition w-fit self-start"
                  >
                    {expandedProductId === product.id
                      ? "Show Less"
                      : "View Details"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <ProductDescriptions />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
