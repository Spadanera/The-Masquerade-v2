// vue.config.js
module.exports = {
    devServer: {
      public: '127.0.0.100:8080'
      // disableHostCheck: true,
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