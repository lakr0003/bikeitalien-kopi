/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jkbnglbcdsffqntmwhsi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "react-icons/ai",
      "react-icons/bs",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/fi",
      "react-icons/go",
      "react-icons/io",
      "react-icons/io5",
      "react-icons/md",
      "react-icons/pi",
      "react-icons/ri",
      "react-icons/rx",
      "react-icons/tb",
    ],
  },
};

export default nextConfig;
