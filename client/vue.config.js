// vue.config.js
module.exports = {
    devServer: {
      proxy: {
        '/api':{
          target: process.env.API_URL || 'http://localhost:3000/',
          changeOrigin: true
        },
        '/auth':{
          target: process.env.API_URL || 'http://localhost:3000/',
          changeOrigin: true
        }
      }
    }
  }