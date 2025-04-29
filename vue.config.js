const path = require('path')
const resolve = dir => { return path.join(__dirname, dir) }
const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const { config } = require('process')
console.log(process.env.NODE_ENV)
module.exports = defineConfig({
  productionSourceMap: false, // 生产环境是否要生成 sourceMap
  lintOnSave: false, // 关闭eslint校验
  transpileDependencies: true,
  outputDir: 'young',
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 8085
    // proxy:{
    //   '/':{
    //     target:'',
    //     changeOrigin:true
    //   }
    // }

  },
  configureWebpack: {
    devtool: 'hidden-source-map',
    output: {
      filename: 'js/[name]-[hash].js',
      chunkFilename: 'js/[id]-[chunkhash:8].js'
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'static'),
            to: path.join(__dirname, 'young/static/')
          }
        ]
      })
    ]
  },
  chainWebpack: config => {
    // 设置别名
    config.resolve.alias
      .set('@a', resolve('src/assets'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
    // 正式打包删除console和debugger
    config.optimization
      .minimize(true)
      .minimizer('terser')
      .tap(args => {
        const { terserOptions } = args[0]
        terserOptions.compress.drop_console = false
        terserOptions.compress.drop_debugger = process.env.NODE_ENV !== 'development'
        return args
      })
  }
})
