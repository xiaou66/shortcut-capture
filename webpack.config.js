const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    mode: 'production',
    target: 'node',
    entry:  {
        preload: './preload.js',
        'brush/index': './brush/index.js',
        'brush/preload': './brush/preload.js',
        'brush/tool/index': './brush/tool/index.js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    dead_code: true,
                    loops: true,
                },
                mangle: false
            }
        })]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'brush/index.html',
            template: 'brush/index.html',
            chunks: ['index'],
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'logo.png', to: ''},
                { from: 'plugin.json', to: ''},
                { from: 'brush/lib', to: 'brush/lib' },
                { from: 'brush/font', to: 'brush/font' },
                { from: 'brush/css', to: 'brush/css' },
                { from: 'utils', to: 'utils'},
            ],
        }),
    ],
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    output: {
        filename: "[name].js",
    },
    externals: {
        'electron': 'require("electron")'
    },
}
