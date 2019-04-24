// vue.config.js
module.exports = {
    devServer: {
      public: '0.0.0.0:80'
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