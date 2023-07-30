/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // modularizeImports: {
  //     '@mui/icons-material': {
  //       transform: '@mui/icons-material/{{member}}',
  //     },
  //   },    
  env: {
    DIRECTUS_URL_DEV: process.env.DIRECTUS_URL_DEV,
    DIRECTUS_IMAGE_DOMAIN_DEV: process.env.DIRECTUS_IMAGE_DOMAIN_DEV,
    DIRECTUS_URL_DO: process.env.DIRECTUS_URL_DO,
    DIRECTUS_IMAGE_DOMAIN_DO: process.env.DIRECTUS_IMAGE_DOMAIN_DO,
  },

  images: {
    // domains: [`${process.env.DIRECTUS_IMAGE_DOMAIN_DEV}`],
    domains: [`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}`],
    minimumCacheTTL: 60,
    /* add remotePatterns to fix issue of Un-configured Host*/
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'data.raysun.cc',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
  
};

module.exports = nextConfig
