var webpack = require('webpack');
var path = require('path');
var inProduction = process.env.NODe_ENV === 'production';
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        app: ['./src/main.js', './src/main.scss']
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.s[ca]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "raw-loader" , "sass-loader"
                    ]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction,
        })

    ]

};


if (inProduction) {
    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

