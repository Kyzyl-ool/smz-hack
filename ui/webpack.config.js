const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sourceRoot = path.resolve(__dirname, 'src');
const CSSSpritePlugin = require('css-sprite-loader').Plugin;
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: sourceRoot + '/index.js',         //entryPoint to app to begin bilding
    output: {
        filename: "main.js",                     //bundle path
        path: path.resolve(__dirname, 'dist'),   //bundle location
        publicPath: '/',
    },
    module: {
        //webpack understand only js and json files,
        rules: [                                 //for .css files you should add loader
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'css-sprite-loader']
            },
            {
                test: /\.scss$/,
                use: ['sass-loader']
            },
            /*{
                test: /\.css$/,
                loader: 'style-loader'
            }, {
                test: /\.css$/,
                loader: 'css-loader',
                /!*query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }*!/
            },*/
            /*{
                test: /index\.css$/,
                include: sourceRoot,
                use: ExtractTextPlugin.extract('css-loader')
            },*/
            {
                test: /\.(png|jpg|svg)$/,
                use: {
                    loader: 'file-loader'
                }
            },
            {
                test: /\.worker\.js$/,
                use: {
                    loader: 'worker-loader'
                }
            },
            {
                test: /-import-icon.svg$/,
                use: [
                    'babel-loader',
                    {
                        loader: 'react-svg-loader',
                        options: {
                            svgo: {
                                plugins: [{removeTitle: false}],
                                floatPrecision: 2
                            }
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.svg', '.ico', '.png']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        host: '0.0.0.0',
        compress: true,
        inline: true,
        hot: true,
    },
    plugins: [
        new CSSSpritePlugin({
            output: './icons'
        }),
        new ExtractTextPlugin({
            filename: 'index.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: 'static'
        // }),
        new CompressionPlugin({
            cache: true,
        })
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 6
                }
            })
        ],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `npm.${packageName.replace('@', '')}`;
                    }
                }
            }
        }
    }
};
