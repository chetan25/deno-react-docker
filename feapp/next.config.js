/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // Basically, you have to add a next.config.js to poll for changes.
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
};
