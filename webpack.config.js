const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  entry: "./src/Switchboard.js",
  output: {
    filename: "Switchboard.js",
    path: path.resolve(__dirname, "build")
  }
};
