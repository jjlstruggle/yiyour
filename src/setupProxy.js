const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://175.178.189.89:12000",
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      }

    })
  );
};
