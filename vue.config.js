const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack:{
    resolve:{
      fallback:{
        "crypto": require.resolve("crypto-browserify"),
        "http": require.resolve("stream-http"),
        "stream": require.resolve("stream-browserify")
      }
    }
  }
})
