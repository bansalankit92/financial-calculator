/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable Turbopack and ignore Angular folder
  turbopack: {},

  // Ignore Angular folder during TypeScript checking
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig; 