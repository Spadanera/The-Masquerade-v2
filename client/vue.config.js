// vue.config.js
module.exports = {
    devServer: {
      disableHostCheck: true,
      // proxy: {
      //   '/api':{
      //     target: process.env.API_URL || 'http://localhost/',
      //     changeOrigin: true
      //   },
      //   '/auth':{
      //     target: process.env.API_URL || 'http://localhost/',
      //     changeOrigin: true
      //   }
      // }
    }
  }