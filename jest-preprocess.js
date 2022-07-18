const babelOptions = {
  presets: [
    "babel-preset-gatsby",
    "@babel/preset-react",
    "@babel/preset-typescript",
    ["@babel/preset-env", { loose: true, targets: { node: "current" } }],
  ],
}
module.exports = require("babel-jest").createTransformer(babelOptions)
