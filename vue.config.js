module.exports = {
  publicPath: '/',
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ''
        }
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
    resolve: {
      alias: {
        "assets": "@/assets",
        "components": "@/components",
        "views": "@/views",
        "config": "@/config",
      }
    },
  },


}