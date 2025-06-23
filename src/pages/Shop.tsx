



import { useState } from "react";
import { Helmet } from "react-helmet";
import { useGetProductsQuery } from "../features/Products/productsAPI";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductDescriptions from "./productsDescriptions";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------- Helper to build JSON-LD schema array ---------- */
const buildSchema = (products: any[]) => {
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
        item: { "@id": "https://www.smartindoordecors.com/", name: "Home" },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: { "@id": "https://www.smartindoordecors.com/shop", name: "Shop" },
      },
    ],
  };

  const productsSchema = products.map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    image: [p.image_url, ...(p.images || []).map((i: any) => i.url)],
    description: p.description,
    sku: `SKU-${p.id}`,
    brand: { "@type": "Brand", name: "Smart Indoor Decors" },
    offers: {
      "@type": "Offer",
      url: `https://www.smartindoordecors.com/shop#product-${p.id}`,
      priceCurrency: "KES",
      price: p.price,
      priceValidUntil: "2025-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability:
        p.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      bestRating: "5",
      ratingCount: "24",
      reviewCount: "24",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Jane Doe" },
        datePublished: "2025-06-01",
        reviewBody: "Excellent quality product and fast delivery.",
        name: "High quality!",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
      },
    ],
  }));

  return [organization, website, breadcrumb, ...productsSchema];
};
/* --------------------------------------------------------- */

const Shop = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading, error } = useGetProductsQuery({});

  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-between">
      {/* SEO meta & structured data */}
      <Helmet>
        <title>Shop All Products | Smart Indoor Decors</title>
        <meta
          name="description"
          content="Explore our full range of home decor, fashion, and lifestyle products. Quality products delivered anywhere in Kenya."
        />
        <link rel="canonical" href="https://www.smartindoordecors.com/shop" />
      </Helmet>

      {!isLoading && products.length > 0 && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(buildSchema(products))}
          </script>
        </Helmet>
      )}

      <Navbar />

      {/* ---------------- Main Grid ---------------- */}
      <main className="max-w-7xl mx-auto px-4 py-10 flex-grow">
        <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">
          Browse Our Entire Collection
        </h1>

        {isLoading && <p className="text-center">Loading products...</p>}
        {error && (
          <p className="text-center text-red-500">
            Failed to load products. Please try again later.
          </p>
        )}

        {!isLoading && products.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  id={`product-${product.id}`}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100 flex flex-col"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    onClick={() => setZoomImageUrl(product.image_url)}
                    className="rounded-t-2xl h-56 w-full object-cover cursor-zoom-in hover:scale-[1.02] transition"
                  />

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.category?.name || "Uncategorized"}
                      </p>
                      <p className="mt-2 text-orange-600 font-bold">
                        KES {product.price.toLocaleString()}
                      </p>
                      <p className="mt-1 text-xs text-gray-400 truncate">
                        {product.description}
                      </p>
                      {product.colors && (
                        <p className="text-xs mt-1 text-gray-600">
                          <strong>Available Colors:</strong> {product.colors}
                        </p>
                      )}
                      {product.warranty && (
                        <p className="text-xs mt-1 text-gray-600">
                          <strong>Warranty:</strong> {product.warranty}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setMainImage(product.image_url);
                      }}
                      className="mt-4 text-sm font-medium text-orange-600 bg-orange-100 hover:bg-orange-200 py-2 px-4 rounded-full transition w-fit self-start"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Marketing/SEO descriptions */}
            <div className="mt-12">
              <ProductDescriptions />
            </div>
          </>
        )}
      </main>

      <Footer />

      {/* ------ Zoom overlay for grid image ------ */}
      {zoomImageUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setZoomImageUrl(null)}
        >
          <img
            src={zoomImageUrl}
            alt="Zoomed"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* ------ Product modal ------ */}
      {selectedProduct && (
        <>
          {/* inner zoom overlay */}
          {zoomed && (
            <div
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
              onClick={() => setZoomed(false)}
            >
              <img
                src={mainImage || selectedProduct.image_url}
                alt="Zoomed"
                className="max-w-[90%] max-h-[90%] rounded-xl shadow-lg"
              />
            </div>
          )}

          {/* modal content */}
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-3xl w-full mx-4 my-12 p-6 relative">
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setMainImage(null);
                  setZoomed(false);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={mainImage || selectedProduct.image_url}
                alt={selectedProduct.name}
                onClick={() => setZoomed(true)}
                className="rounded-xl w-full object-cover h-64 mb-4 cursor-zoom-in transition hover:scale-[1.02]"
              />

              {selectedProduct.images?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto mb-4">
                  {[
                    { url: selectedProduct.image_url },
                    ...selectedProduct.images,
                  ].map((img: any, i: number) => (
                    <img
                      key={i}
                      src={img.url}
                      onClick={() => setMainImage(img.url)}
                      className={`h-20 w-20 object-cover rounded-md cursor-pointer border ${
                        (mainImage || selectedProduct.image_url) === img.url
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                      alt={`thumb-${i}`}
                    />
                  ))}
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {selectedProduct.name}
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Category: {selectedProduct.category?.name || "Uncategorized"}
              </p>
              <p className="text-orange-600 font-bold text-xl mb-3">
                KES {selectedProduct.price.toLocaleString()}
              </p>
              <p className="text-gray-700 mb-4">
                {selectedProduct.description}
              </p>
              {selectedProduct.colors && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Colors:</strong> {selectedProduct.colors}
                </p>
              )}
              {selectedProduct.warranty && (
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Warranty:</strong> {selectedProduct.warranty}
                </p>
              )}
              <p className="text-sm text-gray-400 mb-6">
                Stock: {selectedProduct.stock}
              </p>

              {/* optional video */}
              {selectedProduct.videos?.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Product Demo</h3>
                  <iframe
                    src={selectedProduct.videos[0].url.replace(
                      "shorts/",
                      "embed/"
                    )}
                    className="w-full h-56 rounded-md"
                    title="Product Video"
                    allowFullScreen
                  />
                </div>
              )}

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg"
              >
                Add to Cart / Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
