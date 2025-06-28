const fs = require("fs");
const axios = require("axios");

const BASE_URL = "https://www.smartindoordecors.com";
const API_URL =
  "https://ecommerce-backend-yeq9.onrender.com/products/?skip=0&limit=2"; // adjust if needed

async function generateSitemap() {
  const staticRoutes = [
    "/",
    "/about",
    "/blog",
    "/faq",
    "/shop",
    "/terms",
    "/privacy",
    "/services",
    "/contact",
    "/testimonials",
  ];

  const staticUrls = staticRoutes
    .map(
      (route) => `
    <url>
      <loc>${BASE_URL}${route}</loc>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>
  `
    )
    .join("");

  try {
    const res = await axios.get(API_URL);
    const products = res.data || [];

    const productUrls = products
      .map((product) => {
        return `
        <url>
          <loc>${BASE_URL}/product/${product.id}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.9</priority>
        </url>
      `;
      })
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${productUrls}
</urlset>`;

    fs.writeFileSync("./public/sitemap.xml", sitemap.trim());
    console.log("✅ Sitemap generated at public/sitemap.xml");
  } catch (error) {
    console.error("❌ Failed to generate sitemap:", error.message);
  }
}

generateSitemap();
