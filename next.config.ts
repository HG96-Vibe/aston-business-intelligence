import type { NextConfig } from "next";

/* Static export for Namecheap shared hosting: `npm run build` writes plain HTML/CSS/JS to /out.
   Redirects (/work, /health-check) live in public/.htaccess; the two forms post to public/send.php. */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
