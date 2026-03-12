/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@siatec-egresos/api-client', '@siatec-egresos/contracts', '@siatec-egresos/ui'],
};

module.exports = nextConfig;
