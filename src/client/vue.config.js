// vue.config.js
module.exports = {
    devServer: {
      proxy: {
        '/api':{
          target: 'http://localhost:3000',
          changeOrigin: true
        },
        '/auth':{
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }