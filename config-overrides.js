const { addLessLoader, override, fixBabelImports } = require('customize-cra')
const bodyParser = require('body-parser')
const apis = require('./mock')

module.exports = {
  webpack: override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#0DA0DE'
      }
    }),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    })
  ),
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.before = app => {
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        apis(app)
      }
      return config
    }
  }
}
