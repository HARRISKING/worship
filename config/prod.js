module.exports = {
  env: {
    NODE_ENV: '"production"',
    BASE_URL: '"https://bannatie.cn"', // 小程序使用，直接请求
    BASE_API: '"/api"', // h5使用，代理请求
  },
  defineConstants: {},
  mini: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  },
};
