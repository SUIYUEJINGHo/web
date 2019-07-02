// webpack 配置文件
var webpack            = require('webpack');
//  打包css用得插件
var ExtractTextPlugin  = require("extract-text-webpack-plugin");
// 引入打包html用得插件
var htmlWebpackPlugin  = require('html-webpack-plugin');
// 获取html打包对象
var WEBPACK_ENV        = process.env.WEBPACK_ENV || 'dev';
// 引入path组件
var path               = require('path');
var getHtmlConfig = function(name){
     return {
         // 要打包得文件地址
         template : './src/view/' + name + '.html',
         // 打包到得文件地址
         filename : 'view/' + name + '.html',
         //  把js写入到html的位置：{
         //  true 默认值，script标签位于html文件的 body 底部
         //  body script标签位于html文件的 body 底部
         //  head script标签位于html文件的 head中
         //  false 不插入生成的js文件，这个几乎不会用到的
         // }
         inject : 'true',
         hash   : 'true',
         // chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
         chunks : ['common' , name]
     }
};
var config = {
    // 入口文件 可以配置多个文件
    entry : {
      'common': ['./src/page/common/index.js'],
      'index' : ['./src/page/index/index.js'],
      'login' : ['./src/page/login/index.js']
    },
    // output 选项控制 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个入口起点，但只指定一个输出配置
    output : {
        // 出口文件路径
        path : './dist',
        // 访问地址的路径在src下的
        publicPath : '/dist',
        // 1，出口文件名称 [name]  name动态值 可以根据源文件名字 打包到目标文件夹下
        // 2，还可以根据文件名称区分文件名字
        filename : 'js/[name].js'
    },
    // externals : 引入外部得变量
    externals : {
        // jquery ： 引入jquery
        'jquery' : 'window.jQuery'
    },
    resolve : {
      alias : {
          node_modules    : path.join(__dirname,'node_modules'),
          util             : path.join(__dirname,'src' , 'util'),
          page             : path.join(__dirname,'src' , 'page'),
          service          : path.join(__dirname,'src' , 'service'),
          image            : path.join(__dirname,'src' , 'image')
      }
    },
    module: {
        loaders: [
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader:  'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string/,  loader :'html-loader' }

        ]
    },
    // 引入一些外部得插件
    plugins : [
        // 主要是用来提取第三方库和公共模块，避免首屏加载的bundle文件或者按需加载的bundle文件体积过大，从而导致加载时间过长，是一把优化项目的利器。
        new webpack.optimize.CommonsChunkPlugin({
            // 引入全局配置文件所用
            name     : 'common',
            // 打包文件路径。 在dist下
            filename : 'js/base.js'
        }),
        //  打包css用得模块
        new ExtractTextPlugin("css/[name].css"),
        new htmlWebpackPlugin(getHtmlConfig('index')),
        new htmlWebpackPlugin(getHtmlConfig('login'))
    ]
};
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
console.log("!!!!" + config.resolve.alias.node_modules);
