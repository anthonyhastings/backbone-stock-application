// Loading dependencies.
var webpack = require('webpack');

/**
 * Webpack configuration options.
 * @type {Object}
 */
module.exports = {
    entry: {
        'main': './src/scripts/index.js',
        'main.min': './src/scripts/index.js'
    },
    output: {
        path: './dist/js/',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.handlebars/,
                exclude: /(node_modules|bower_components)/,
                loader: 'handlebars-loader',
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            exclude: /\.min\.js$/
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            compress: {
                'drop_console': false,
                'drop_debugger': false,
                'warnings': false
            }
        })
    ]
};
