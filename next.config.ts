/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.bmkg.go.id" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
  // Leaflet requires transpilation for SSR compatibility
  transpilePackages: [],
};

module.exports = nextConfig;
