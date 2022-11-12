module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        nprogress: 'NProgress',
        'vue-lazyload': 'VueLazyload'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  },
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        views: '@/views',
        assets: '@/assets'
      }
    }
  },
  publicPath: './',
  devServer: {
    // proxy: 'https://www.mylapi.icu'
    proxy: {
      '/api': { // 触发匹配路径
        // target: 'https://lianghj.top:3000', // 代理跳转到的站点
        target: 'https://www.mylapi.icu',
        changeOrigin: true, // 允许跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      },
      '/prod': { // 触发匹配路径
        // target: 'https://lianghj.top:3000', // 代理跳转到的站点
        target: 'https://www.mylapi.icu',
        changeOrigin: true, // 允许跨域
        secure: 'true',
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/prod': ''
        }
      }
    }

  }

}
