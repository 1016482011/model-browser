const multer = require('multer')
const upload = multer()
const file = require('./file')
const mdoel = require('./model')
function api(app) {
  //文件接口 1.上传文件  2.获取转换进度
  app.post('/upload', upload.any(), file.upload)
  app.post('/getModelList', mdoel.getModelList)
}

module.exports = api
