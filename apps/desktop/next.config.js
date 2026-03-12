/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Needed for Tauri: generates a static `out/` directory.
  output: 'export',
};

module.exports = nextConfig;
