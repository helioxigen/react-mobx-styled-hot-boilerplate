const webpack = require("webpack")
const path = require("path")

const СleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const isProd = process.env.NODE_ENV === "production"
const isDev = process.env.NODE_ENV === "development"

const ifDev = plugin => (isDev ? plugin : undefined)
const removeEmpty = arr => arr.filter(p => !!p)

module.exports = {
    entry: removeEmpty([
        "@babel/polyfill",
        ifDev("react-hot-loader/patch"),
        ifDev("webpack-dev-server/client?http://0.0.0.0:3000"),
        path.join(__dirname, "./src/assets/fonts/index.js"),
        path.join(__dirname, "./src/index.jsx"),
    ]),

    optimization: {
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: "all",
        },
    },

    output: {
        path: path.resolve(__dirname, "build"),
        chunkFilename: "[name].[chunkhash].js",
        filename: "[name].[hash].bundle.js",
        library: "build",
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.join(__dirname, "src"),
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.(png|svg|gif|jpg|woff|woff2)$/,
                exclude: /node_modules/,
                loader: "file-loader",
                options: Object.assign(
                    {
                        outputPath: "assets/",
                    },
                    isProd ? { name: "[hash].[ext]" } : {},
                ),
            },
        ],
    },

    plugins: [
        new СleanWebpackPlugin("build"),
        new HtmlWebpackPlugin(),
        ...removeEmpty([ifDev(new webpack.NamedModulesPlugin())]),
    ],

    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "src")],
        extensions: [".js", ".jsx"],
    },

    devtool: isProd ? "nosources-source-map" : "eval-source-map",

    devServer: {
        host: "0.0.0.0",
        port: 3000,
        contentBase: path.join(__dirname, "build/"),
        watchOptions: {
            ignored: /node_modules|build/,
        },
    },
}
