const withLess = require('next-with-less');

module.exports = withLess({
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
    },
  },
  images: {
    domains: [
      "localhost:3000",
      "fetv2022.netservex.com",
    ],
  },
  env: {
    SERVER: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  basePath: '/francais-et-vous',
});
