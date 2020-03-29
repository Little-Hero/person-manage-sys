module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                common: '@/common',
                components: '@/components',
                network: '@/network',
                views: '@/views'
            }
        }
    },
    // devServer: {
    //     proxy: "http://localhost/8080"
    // {
    //     '/api': {
    //         target: 'http://localhost/8080', // 需要请求的地址
    //         changeOrigin: true, // 是否跨域
    //         ws: true,
    //         pathRewrite: {
    //             '^/api': '' // 替换target中的请求地址，也就是说，在请求的时候，url用'/proxy'代替'http://ip.taobao.com'
    //         }
    //     }

    // }

    // }
}