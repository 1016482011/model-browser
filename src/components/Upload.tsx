import React from 'react'
import _ from 'lodash'
import add from '../assets/img/add.png'
import * as apis from '../helper/api'
import { message } from 'antd'
type info = (progress: number) => void
type progressVis = (progress: string) => void

interface Props {
  title: string
  tip: string
  maxSiz?: number
  modelId?: string
  onChange: info
  onComple: info
  onSetState: progressVis
}

function Upload({
  title,
  tip,
  onChange,
  onComple,
  onSetState,
  modelId = '',
  maxSiz = 0
}: Props) {
  let inputEl: HTMLInputElement | null = null
  return (
    <div
      className="m-upload"
      onClick={e => {
        if (_.isNull(inputEl)) return
        inputEl.value = ''
        inputEl.click()
      }}
    >
      <img src={add} alt="upload" />
      <div className="m-upload__title">{title}</div>
      <div className="m-upload__tip">{tip}</div>
      <input
        accept=".bin,.pdf,.rar"
        ref={el => (inputEl = el)}
        type="file"
        value=""
        onChange={e =>
          uploadVail(e, onChange, onComple, onSetState, maxSiz, modelId)
        }
        style={{ display: 'none' }}
      />
    </div>
  )
}

function uploadVail(
  inputEl: React.ChangeEvent<HTMLInputElement>,
  onChange: info,
  onComple: info,
  onSetState: progressVis,
  maxSiz: number,
  modelId: string
) {
  if (!inputEl.currentTarget || !inputEl.currentTarget.files) return
  //判断文件大小
  if (maxSiz > 0) {
    if (inputEl.currentTarget.files[0].size > maxSiz) {
      message.error('文件过大,请重新上传!')
      return
    }
  }
  onSetState('block')
  const formData = new FormData()
  formData.append('file', inputEl.currentTarget.files[0])
  formData.append('bim_model_id', modelId)
  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', uploadProgress(onChange), false)
  xhr.open('POST', apis.uploadFileUrl(), true)
  xhr.send(formData)
  xhr.onload = function() {
    if (xhr.status == 200 && xhr.responseText) {
      const obj: { code: number } = JSON.parse(xhr.responseText)
      onComple(obj.code)
      message.success('上传成功')
    } else {
      message.error('上传失败,请重新上传！')
      onComple(1)
    }
    onSetState('none')
  }
}
function uploadProgress(onChange: info) {
  return function(e: ProgressEvent) {
    if (e.lengthComputable) {
      const progress = Math.round((e.loaded / e.total) * 100)
      onChange(progress)
    }
  }
}
export { Upload }
