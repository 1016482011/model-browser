function upload(req, res) {
  let files = req.files[0]
  console.log(files)
  let backData = {
    code: 0, //0成功 1失败
    msg: 'ok'
  }
  res.json(backData)
}

module.exports = upload
