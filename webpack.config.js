const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    mode: 'production',
    target: 'node',
    entry:  {
        'brush/index': './brush/index.js',
        'brush/preload': './brush/preload.js',
        'brush/tool/index': './brush/tool/index.js',
        // 'utils/UToolsUtils': './utils/UToolsUtils.js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            // 启用多进程并发运行
            parallel: true,
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
                { from: 'utils', to: 'utils'}
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
