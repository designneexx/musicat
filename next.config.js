/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.deezer.com', 'e-cdns-images.dzcdn.net'],
  },
  env: {
    RAPID_API_HOST: 'deezerdevs-deezer.p.rapidapi.com',
    RAPID_API_KEY: 'd056004aaemsh45df73b2cc893a1p1d896cjsn06cb1aadb495',
    RAPID_API_URL: 'https://deezerdevs-deezer.p.rapidapi.com/',
    CLIENT_ID: 8206303,
    HOST_LOCAL: 'http://localhost:3000',
    API_HOST: 'http://localhost:8888',
  },
}

module.exports = nextConfig
