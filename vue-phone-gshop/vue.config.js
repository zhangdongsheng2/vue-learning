const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // transpileDependencies: true,
  lintOnSave: true,
  productionSourceMap: false,
  chainWebpack: config => {
    const entry = config.entry('app')
    entry
        .add('babel-polyfill')
        .end()
    entry
        .add('classlist-polyfill')
        .end()
  },
  css: {
    // 忽略 CSS order 顺序警告
    extract: { ignoreOrder: true }
  },

  // 配置转发代理
  devServer: {
    port: 9373,
    proxy: {
      '/api': {
        target: "http://192.168.71.45:9379",
        // ws: false, // 需要websocket 开启
        pathRewrite: {
          // '^/': '/'
          '^/api/': '/'   // 本地调试
        }
      }
    }
  }
})



