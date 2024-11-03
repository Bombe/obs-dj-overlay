const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    ['/crate', '/history', '/overlay', '/runtime', '/search', '/sources'].forEach(path => {
        app.use(
            path,
            createProxyMiddleware({
                target: `http://localhost:5000${path}`,
                changeOrigin: true
            })
        )
    })
}
