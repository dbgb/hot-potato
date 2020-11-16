// ref: https://jestjs.io/docs/en/tutorial-react#custom-transformers
const babelJest = require("babel-jest");

const babelPresets = {
  presets: ["babel-preset-gatsby"],
};

module.exports = babelJest.createTransformer(babelPresets);
