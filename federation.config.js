const {
  withNativeFederation,
  shareAll,
  share
} = require("@angular-architects/native-federation/config");

module.exports = withNativeFederation({
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
    ...share({
      "@one/core": {
        singleton: true,
        strictVersion: true,
        requiredVersion: "4.0.0",
      },
    }),
  },

  skip: [
    "rxjs/ajax",
    "rxjs/fetch",
    "rxjs/testing",
    "rxjs/webSocket",
    /^@module-federation/,
    // Add further packages you don't need at runtime
  ],

  // Please read our FAQ about sharing libs:
  // https://shorturl.at/jmzH0
});
