/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,output: "standalone",
  images: {
    domains: [
      "getlasso.co",
      "images.unsplash.com",
      "v5.airtableusercontent.com",
      "d1muf25xaso8hp.cloudfront.net",
      "ik.imagekit.io",
      "placehold.co",
      "media.licdn.com",
      "pbs.twimg.com",
      "cdn.sanity.io",
      "media.licdn.com"
    ],
  },
};

module.exports = nextConfig;
