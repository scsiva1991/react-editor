const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
    module: {
      rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },       
        {
            test: /\.(css|sass|scss)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            require('autoprefixer')
                        ],
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }
      ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                js: {
                    test: /\.js$/,
                    name: "commons",
                    chunks: "all",
                    minChunks: 7,
                },
                css: {
                    test: /\.(css|sass|scss)$/,
                    name: "commons",
                    chunks: "all",
                    minChunks: 2,
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `styles/[name].css`
        }),
    ],
};
