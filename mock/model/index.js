//获取转换进度
const obj = {
  req: { id: 'udusdu' },
  res: {
    code: 0, //0成功 1失败
    timeConsum: 10 //耗时
  }
}
//获取模型及分组列表(模型列表及未关联分组的模型)
const objModelList = {
  res: [
    {
      id: 1,
      updatetime: '2019-10-11 15:12:01',
      type: 0, //0:模型组 1.模型
      name: '测试模型.bin',
      imgUrl: '1.png' //缩略图地址
    },
    {
      id: 2,
      updatetime: '2019-10-11 15:12:01',
      type: 1, //0:模型组 1.模型
      name: '模型组1',
      imgUrl: '1.png' //缩略图地址
    }
  ]
}
//模型移动  //模型复制
const removeOrCopeModel = {
  req: {
    type: 0, //0移动 1复制
    modelId: 'udusdu', //模型Id
    groupId: 'udusdu' //分组id
  },
  res: {
    code: 0, //0成功 1失败
    text: 'ok'
  }
}
//删除模型
const delModel = {
  req: {
    id: 'udusdu' //模型id
  },
  res: {
    code: 0, //0成功 1失败
    text: 'ok'
  }
}

//根据文件名称判断文件能上传
const isCanUploadByName = {
  req: {
    name: 'udusdu' //模型name
  },
  res: {
    code: 0, //0成功 1失败
    text: 'ok'
  }
}
function modelProgress(req, res) {
  let backData = obj.res
  res.json(backData)
}

function getModelList(req, res) {
  let backData = objModelList.res
  res.json(backData)
}

module.exports = {
  getModelList
}
