const {
  override,
  addWebpackAlias,
  addLessLoader,
  addDecoratorsLegacy,
  useEslintRc,
} = require('customize-cra')
const path = require('path')

const customize = () => (config) => {
  // 要自定义的配置内容
  return config
}
module.exports = override()
