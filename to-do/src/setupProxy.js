const proxy = require('http-proxy-middleware')
module.exports = function (app) {
    // console.log(location.origin)
    app.use(
        proxy('/api', { //遇见、api1前缀的请求就触发代理
            target: 'http://mobilecdnbj.kugou.com/api',//请求转发地址
            changeOrigin: true,//控制服务器收到的响应头中Host字段的值
            pathRewrite: {//重写请求地址，为的是吧代码里面的用于代理的/api给替换掉
                '^/api': ''
            }
        }),
        proxy('/api2', { //遇见、api2前缀的请求就触发代理
            target: 'http:loclhost:5001',//请求转发地址
            changeOrigin: true,//控制服务器收到的响应头中Host字段的值
            pathRewrite: {//重写请求地址，为的是吧请求地址中的api2给去掉
                '^/api2': ''
            }
        })
    )
}