module.exports = {
  parser: "@babel/eslint-parser",
  devServer: {
    proxy: "http://localhost:3000",
  },
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ["@babel/preset-env"],
    },
  },
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/VueTodoApp/" : "/",
};
