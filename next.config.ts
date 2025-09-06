import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['react-map-gl'],
  env: {
    MAPBOX_TOKEN : process.env.MAPBOX_TOKEN,
    MAPBOX_STYLE : process.env.MAPBOX_STYLE,
    CONNECTION_STRING : process.env.CONNECTION_STRING,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
  }
};

export default nextConfig;
