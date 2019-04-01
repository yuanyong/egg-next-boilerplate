// next.config.js
const withTypescript = require("@zeit/next-typescript");
const withSize = require('next-size')

module.exports = withSize(
  withTypescript({
    distDir: "../.next",
    webpack(config, options) {
      return config;
    },
  })
);
