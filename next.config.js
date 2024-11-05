const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    unoptimized: true
  },
  experimental: {
    swcPlugins: [["@onlook/nextjs", {
      root: path.resolve(".")
    }]]
  }
};
module.exports = nextConfig;