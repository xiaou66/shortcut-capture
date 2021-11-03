const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    mode: 'production',
    target: 'node',
    entry:  {
        preload: './preload.js',
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            // 启用多进程并发运行
            parallel: true,
            terserOptions: {
                mangle: false
            }
        })]
    },
    plugins: [
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
