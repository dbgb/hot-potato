module.exports = {
  // ref: https://www.gatsbyjs.com/docs/unit-testing/
  // ref: https://jestjs.io/docs/en/configuration.html
  transform: {
    "^.+\\.jsx?$": "<rootDir>/jest/custom-transformer.js",
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest/__mocks__/file-mock.js",
  },
  testPathIgnorePatterns: ["node_modules", ".cache", "<rootDir>.*/public"],
  watchPathIgnorePatterns: [".cache"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  globals: {
    __PATH_PREFIX__: "",
  },
  testURL: "http://localhost",
  setupFiles: ["<rootDir>/jest/gatsby-loader-shim.js"],
  setupFilesAfterEnv: ["<rootDir>/jest/post-env-setup.js"],
};
