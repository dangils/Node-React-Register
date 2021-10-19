const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({ //클라이언트에서 요청하는 것을 5000번으로 수행
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};;