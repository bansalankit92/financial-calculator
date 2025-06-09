/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Ignore old Angular files
    ignoreDuringBuilds: true,
    dirs: ['src', 'pages', 'components', 'lib', 'utils']
  }
};

module.exports = nextConfig; 