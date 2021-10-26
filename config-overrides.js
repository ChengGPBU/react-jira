const {
  override,
  addWebpackAlias,
  addLessLoader,
  addDecoratorsLegacy,
  useEslintRc,
  fixBabelImports,
} = require('customize-cra')
const path = require('path')

function resolve(dir) {
  console.log('~~~~~path', path.join(__dirname, dir))
  return path.join(__dirname, dir)
}

module.exports = override(
  addWebpackAlias({
    ['@']: resolve('src'),
    ['@utils']: resolve('src/utils'),
    ['@assets']: resolve('src/assets'),
  }),
  // 按需加载 antd
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    modifyVars: { '@primary-color': 'rgb(0,82,204)', '@font-size-base': '16px' },
    javascriptEnabled: true,
  }),
  addDecoratorsLegacy()
)
