
import path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';
import ngAnnotatePlugin from 'ng-annotate-webpack-plugin';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

export default function(env, argv) {
    return {
        context: path.resolve(__dirname, 'src/app'),
        entry: './index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, './dist/www')
        },
        resolve: {
            extensions: ['.js', '.css', '.html']
        },
        devtool: env.production ? 'source-maps' : 'eval',
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
                $: "jquery",
                jQuery: "jquery",
                underscore: 'underscore'
            }),
            new ngAnnotatePlugin({
                add: true,
                // other ng-annotate options here
            }),
            new CopyWebpackPlugin([
                // {output}/to/directory/file.txt
                { from: '../index.html' }

            ], {
                copyUnmodified: true
            }),
            extractLess
        ]
    }
};

