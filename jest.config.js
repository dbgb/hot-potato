module.exports = {
  /*
   * ref:
   * https://www.gatsbyjs.com/docs/unit-testing/
   * https://jestjs.io/docs/en/configuration.html
   */
  globals: {
    __PATH_PREFIX__: "",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/__mocks__/file-stub.js",
  },
  roots: ["<rootDir>", "<rootDir>/jest"],
  setupFiles: ["<rootDir>/jest/gatsby-loader-shim.js"],
  setupFilesAfterEnv: ["<rootDir>/jest/post-env-setup.js"],
  transform: {
    "^.+\\.jsx?$": "<rootDir>/jest/custom-transformer.js",
  },
  testPathIgnorePatterns: ["node_modules", ".cache", "<rootDir>.*/public"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  watchPathIgnorePatterns: [".cache"],
  verbose: true,
};
