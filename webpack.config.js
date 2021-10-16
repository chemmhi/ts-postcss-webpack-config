const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
//在每次打包成新文件时，首先清空dist目录
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false,
      // const:  false,
    }
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              //设置预定义的环境
              presets: [
                  [
                     //指定环境插件
                    '@babel/preset-env',
                      //配置信息
                    {
                      //要兼容的目标浏览器
                      targets: {
                        "chrome": '88',
                        "ie": '11'
                      },
                      //corejs版本
                      'corejs': '3',
                      //使用corejs的方式，“usage"表示按需加载
                      'useBuiltIns': "usage"
                    }
                  ]
              ]
            }
          },
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          //引入postcss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions'
                    }
                  ]
                ]
              }
            }
          },
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      title: 'ProjectName',    //HTML的title
      // template: './src/index.html'    //用来生成HTML的模板
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }

}