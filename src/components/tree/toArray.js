var _react = require('react')

var _react2 = _interopRequireDefault(_react)

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

/**
 * Use  `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */
function toArray(children) {
  var ret = []
  _react2['default'].Children.forEach(children, function(c) {
    ret.push(c)
  })

  return ret
}

export default toArray
