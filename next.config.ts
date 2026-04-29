import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./src/messages/uk.json",
  },
});

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["storage.googleapis.com"],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default withNextIntl(config);
