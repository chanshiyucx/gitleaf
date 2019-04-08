module.exports = {
  productionSourceMap: false,
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        // 修改它的选项...
        options.symbolId = 'icon-[name]'
        return options
      })
  }
}
