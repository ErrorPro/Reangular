var path = require('path')

module.exports = {
	entry: {
    frontend: ["./src/List.jsx", "./src/app.js"]
  },
	output: {
		path: path.join(__dirname, "assets"),
    filename: "frontend.bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.jsx$/,   loader: "jsx-loader" },
		]
  }
}
