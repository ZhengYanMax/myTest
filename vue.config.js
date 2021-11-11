module.exports = {
    devServer: {//配置服务 object
      proxy: {//代理请求
        '/api': {
          target: 'http://localhost:8888',//目标（真实）地址  xxx/api/相对路径
          ws: true,//允许跨域 https 
          changeOrigin: true,//实现跨域
          pathRewrite:{//路径重写   xxx/相对路径
              '^/api':''
          }
        },
        // '/foo': {
        //   target: '<other_url>'
        // }
      }
    }
  }