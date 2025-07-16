const {
  shareAll,
  withModuleFederationPlugin,
  share
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "modfed-mf",

  exposes: {
    "./Component": "./projects/modfed-mf/src/app/app.component.ts",
  },

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
      "@one/core/shared-service": {
        singleton: true,
        strictVersion: true,
        requiredVersion: "4.0.0",
      },
    }),
  },
});
