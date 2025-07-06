/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "ik.imagekit.io",
        pathname: "/srm/**",
      },
    ],
  },
};

export default nextConfig;
