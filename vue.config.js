module.exports = {
  productionSourceMap: false,
  // publicPath 注意修改为自己的根目录，如果直接用 username.github.io 域名则设置为 '/'
  // publicPath: '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/treasure/gitleaf' : '/',
  chainWebpack: config => {
    // svg rule loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.exclude.add(/node_modules/)
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
