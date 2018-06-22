var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var projectRoot = path.resolve(__dirname, '../')
var vuxLoader = require('vux-loader')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
const webpackConfig =
{
    entry: {
        // "vendor1": ["vue", "vue-router", "vuex", "vue-clipboard2"],
        // "vendor2": ["iview"],
        // "vendor3": ["echarts"],
        app: './src/main.js',
        // vendors: ['vue', 'vue-router', 'iview']

    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        // fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')

        }
    },
    // resolveLoader: {
    //     fallback: [path.join(__dirname, '../node_modules')]
    // },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /iview.src.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                //include: [projectRoot, resolve('src'), resolve('test')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            // {
            //     test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            //     loader: 'url-loader',
            //     query: {
            //         limit: 10000,
            //         name: utils.assetsPath('img/[name].[hash:7].[ext]')
            //             // name: utils.assetsPath('[name].[hash:7].[ext]')
            //     }
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url-loader',
            //     query: {
            //         limit: 10000,
            //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //             // name: utils.assetsPath('[name].[hash:7].[ext]')
            //     }
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loaders: [{
                        loader: path.resolve(__dirname, 'cssPathResolver')
                    },
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loaders: [{
                        loader: path.resolve(__dirname, 'cssPathResolver')
                    },
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 10000,
                            name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                        }
                    }
                ]
            }
        ]
    },
}
module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })
