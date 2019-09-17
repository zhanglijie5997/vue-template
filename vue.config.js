const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ['js', 'css']
const os   = require("os");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
function resolve(dir) {
    return path.join(__dirname,dir)
};

module.exports =  {

    publicPath:'./',
    assetsDir:'static',
    outputDir:'dist',
    parallel: os.cpus().length > 1,
    productionSourceMap:false,
    devServer: {
        hot: true,
        port: '8080',
        open: true,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        },
        proxy: {
            '/api': {
                target: 'https://www.redbi.com',
                ws: false,
                changOrigin: true,
                pathRewrite: {
                    "^/api": "" //需要rewrite的,
                }
            },
            '/bpi': {
                target: 'https://www.zhipin.com',
                ws: false,
                changOrigin: true,
                pathRewrite: {
                    "^/bpi": "" //需要rewrite的,
                }
            }
        },
    },
    css:{
        extract:true,
        sourceMap:false,
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))  // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('static', resolve('./src/static'))
            .set('components', resolve('./src/components'))
        // 静态资源处理
        config.module
            .rule('images')
            .use('url-loader')
            // .set('exclude',[resolve('./node_modules')])
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }))
    },
    // 扩展库
    configureWebpack: config => {

        if (process.env.NODE_ENV === 'production') {
            // mutate config for production...

            return {
                optimization:{
                    minimizer: [
                        new UglifyJsPlugin({
                            uglifyOptions: {
                                compress: {
                                    // warnings: false,
                                    drop_console: true,//console
                                    drop_debugger: false,
                                    pure_funcs: ['console.log']//移除console
                                }
                            }
                        })
                    ]
                },
                externals: {
                    /**
                    *key: main.js中全局引入的路径
                    *value: 全局暴露出来的对象名
                    */
                    "vue-router": "VueRouter",
                    "vuex": "Vuex",
                    "axios": "axios",
                    "vue": "Vue",
                    

                },
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/g,//匹配文件夹名称
                    threshold: 10240,// 对超过10kb的进行压缩
                    deleteOriginalAssets: false, //是否删除源文件
                }, {
                        asset: '[path].gz[query]',
                        algorithm: 'gzip',
                        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                        threshold: 10240,
                        minRatio: 0.8
                    })]
            }
        } else {
            // mutate for development...
            return {
                output: {
                    libraryExport: 'default'
                }
            }

        }
    },
    pwa: {
        name: 'Browsing-Exp',
        themeColor: '#6476DB',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/service-worker.js',
            // ...other Workbox options...
        }
    },
}