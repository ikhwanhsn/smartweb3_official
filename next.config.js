/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s2.coinmarketcap.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
// module.exports = {
//   reactStrictMode: true,
//   env: {
//     BASE_URL: process.env.BASE_URL,
//   }
// }
