const path = require('path');
const webpack = require('webpack');

const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = function(env, argv) {
    return {
        context: path.join(__dirname, 'src'),
        entry: {
            app: './index.js',
            'production-dependencies' : ['angular', 'jquery', 'underscore']
        },
        output: {
            filename: 'app.bundle.js',
            path: path.join(__dirname, 'build', 'www')
        },
        resolve: {
            extensions: ['.js', '.css', '.html', '.png']
        },
        devtool: (env && env.production) ? 'source-maps' : 'eval',
        module: {
            rules: [
                {
                    test: /\.html?$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.css?$/,
                    loader: ['style-loader', 'css-loader']
                },
                {
                    test: /\.less?$/,
                    loader: ['style-loader', 'css-loader', 'less-loader']
                },
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['env']
                            }
                        }, {
                            loader: 'eslint-loader'
                        }
                    ]
                },
                {
                    test: require.resolve('jquery'),
                    use: [
                        {
                            loader: 'expose-loader',
                            options: '$'
                        }
                    ]
                },
                { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=1000' }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                underscore: 'underscore',
                '_': 'underscore',
                'moment': 'moment',
                'window.jQuery': 'jquery'
            }),
            new ngAnnotatePlugin({
                add: true,
                // other ng-annotate options here
            }),
            new CopyWebpackPlugin([
                { from: './index.html' }
            ]),
            new ExtractTextPlugin({
                filename: "[name].[contenthash].css",
                disable: !(env && env.production)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'production-dependencies',
                filename: 'production-dependencies.bundle.js'
            })
        ]
    }
};

module.exports = config;