import React from 'react'
import _, { List } from 'lodash'
interface Props {
  progress: number //上传进度
  uploadResult: number //上传结果
}
let refDom: HTMLDivElement
function Progress({ progress, uploadResult }: Props) {
  return (
    <div className="m-progress">
      <div className="m-progress__value">{progress}%</div>
      <div
        ref={e => {
          if (_.isNull(e)) return
          refDom = e
        }}
        className="m-progress__bar"
      >
        {getBar(getProgressHtml(), progress)}
      </div>
    </div>
  )
}

function getProgressHtml() {
  if (_.isUndefined(refDom)) return 0
  const viewWidth = refDom.clientWidth
  const proNum = parseInt(viewWidth / 10 + '')
  return proNum
}

function getBar(proNum: number, progress: number) {
  const newpro = parseInt((proNum * progress) / 100 + '')
  let html: JSX.Element[] = []
  for (var i = 0; i < newpro; i++) {
    html.push(<span key={i} className="m-progress__item" />)
  }
  return <div>{html}</div>
}
export { Progress }
