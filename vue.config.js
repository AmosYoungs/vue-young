const { defineConfig } = require('@vue/cli-service')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
module.exports = defineConfig({
  lintOnSave: false, //关闭eslint校验
  transpileDependencies: true,
  outputDir: 'young',
  devServer: {
    hot: true
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: __dirname + '/static',
            to: __dirname + '/young/static/'
          }
        ]
      })
    ]
  }
})
