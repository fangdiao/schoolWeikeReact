const path = require("path");
const webpack = require("webpack");
//HtmlWebpackPlugin是webpack生成html的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//自动添加css3样式前缀
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const DashboardPlugin = require('webpack-dashboard/plugin');
// const Dashboard = require('webpack-dashboard');
// const dashboard = new Dashboard();

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.less', '.css', '.json']
  },
  context:path.resolve(__dirname,"src"),
  entry: {
    index: "./index.js",
    vendors: [
      // 通用CSS
      path.join(path.join(__dirname, 'src'), 'layouts/less/common.less'),
      // path.join(path.join(__dirname, 'src'), 'layouts/iconfont/iconfont.css'),

      // 通用三方代码
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',

      'classnames',
      'querystring',
      'lodash',

      'redux',
      'redux-actions',
      'redux-promise',
      'redux-thunk',

      'es6-promise',
    ],
  },
  output: {
    path: path.resolve(__dirname,"dist"),              //输出的打包文件相对于这个路径
    publicPath: "",
    filename: "js/[name].[hash].js", //打包后的JS文件名字
    chunkFilename:"js/[id].chunk.js"     //chunk生成配置
  },
  devServer:{
    contentBase: path.join(__dirname, "asstes"),
    inline:true,
    compress: true,
    port:3000,
    hot:true,
    // proxy: {
    //   "/WeiKe": {
    //     target: "http://localhost:8081",
    //   }
    // }
    proxy: {
      "*": {
        target: "http://182.150.37.74:88",
      }
    }
    // proxy: [{
    //   context: ["/weike", "/Weike"],
    //   target: "http://182.150.37.74:88",
    // }]
  },
  module: {
    rules: [
      {
        //css加载器,执行顺序从右到左
        test: /\.css$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test:/\.jsx?$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        include: /src(\\|\/)containers/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!' +
          'postcss-loader!' +
          'less-loader',
          publicPath: '../'
        }),
      },
      {
        test: /\.less$/,
        include: /src(\\|\/)(layouts|components)/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader!' +
          'postcss-loader!' +
          'less-loader',
          publicPath: '../'})
      },
      // {
      //   test: /\.less$/,
      //   include: /src(\\|\/)containers/,
      //   loader: 'style-loader!' +
      //           'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!' +
      //           'postcss-loader!' +
      //           'less-loader'
      // },
      //
      // {
      //   test: /\.less$/,
      //   include: /src(\\|\/)(layouts|components)/,
      //   loader: 'style-loader!' +
      //           'css-loader!' +
      //           'postcss-loader!' +
      //           'less-loader'
      // },
      {
        //图片加载器,可以将较小的图片转成base64，减少http请求
        //如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/i,
        include: /src(\\|\/)layouts/,
        loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
      },
      // {
      //   test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   include: /src(\\|\/)layouts/,
      //   loader: 'url-loader',
      // },
      {
        //文件加载器,处理静态资源
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=./fonts/[name].[ext]',
        exclude: path.resolve(__dirname, "node_modules")
      }
    ]
  },
  plugins: [
    //index页面的配置
    new HtmlWebpackPlugin({
      filename: "index.html",          //index页面打包后的文件名
      template: "./index.html",   //index页面的模板文件
      inject: "body",                  //js文件放在body
      chunks: ["index", "vendors"],      //需要加入的js文件
      title: "index",
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new DashboardPlugin(dashboard.setData),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      warnings: false
    }),
    new ExtractTextPlugin(`css/[name].[chunkhash:5].css`, {allChunks: true}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer];
        }
      }
    })
  ]
}
