const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./scripts/app.ts",
    output: {
        path: path.resolve(__dirname, "wwwroot/js"),
        filename: "scripts.js",
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
};