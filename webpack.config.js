const path = require("path");
const webpack = require("webpack");
//HtmlWebpackPlugin是webpack生成html的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//自动添加css3样式前缀
const autoprefixer = require("autoprefixer");

const DashboardPlugin = require('webpack-dashboard/plugin');
const Dashboard = require('webpack-dashboard');
const dashboard = new Dashboard();

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.less', '.css', '.json']
  },
  context:path.resolve(__dirname,"src"),
  entry: {
    index: "./index.js",         //首页入口
  },
  output: {
    path: path.resolve(__dirname,"dist"),              //输出的打包文件相对于这个路径
    //publicPath: "/",
    filename: "js/[name].js", //打包后的JS文件名字
    chunkFilename:"js/[id].chunk.js"     //chunk生成配置
  },
  devServer:{
    contentBase: path.join(__dirname, "asstes"),
    inline:true,
    compress: true,
    port:8080,
    hot:true,
    publicPath:"/dist",
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
        loader: 'babel-loader',
        options: {
          presets: ['es2015','react']
        }
      },
      {
        //less加载器
        test:/\.less$/,
        exclude: path.resolve(__dirname, "node_modules"),
        loader: "style-loader!css-loader!postcss-loader!less-loader"
      },
      {
        //html模板加载器
        test: /\.html$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: "html-loader"
      },
        //ejs模板加载器
      {
        test: /\.ejs$/,
        exclude: path.resolve(__dirname, "node_modules"),
        use: "ejs-loader"
      },
      {
        //图片加载器,可以将较小的图片转成base64，减少http请求
        //如下配置，将小于8192byte的图片转成base64码
        test: /\.(png|jpg|gif)$/i,
        exclude: path.resolve(__dirname, "node_modules"),
        use: 'url-loader?limit=8192&name=./img/[hash].[ext]'
      },
      {
        //文件加载器,处理静态资源
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=./fonts/[name].[ext]',
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
      chunks: ["index"],      //需要加入的js文件
      title: "index",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(dashboard.setData),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: function () {
          return [autoprefixer];
        }
      }
    })
  ]
}
