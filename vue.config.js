module.exports = {
     publicPath: './',
    // outputDir: 'dist',
    // // webpack-dev-server 相关配置
    // devServer: {
    //   port: 8080,
    // },
    //配置别名
    configureWebpack:{    
        resolve:{//解决
            extensions:[],
            alias:{//别名
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }  
        }
    }
}