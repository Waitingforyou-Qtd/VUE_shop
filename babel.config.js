// 项目发布阶段用到的Babel插件
const prodPlugins = []

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    'transform-remove-console'
  ]
}
