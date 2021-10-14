const {
  override,
  addWebpackAlias,
  addLessLoader,
  addDecoratorsLegacy,
  useEslintRc,
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
  }),
  addDecoratorsLegacy()
)
