import React from 'react'
import { message } from 'antd'
import { IconEnum, SvgIcon, Modal, Button } from '../index'
import QRCode from 'qrcode'

interface Props {
  visible: boolean
  title: string
  link: string
  onClose?: () => any
  onOk?: () => any
}

interface State {
  qrUrl: string | null
}

class ModalShare extends React.Component<Props, State> {
  state: State = {
    qrUrl: null
  }
  componentDidMount() {
    const { link } = this.props
    // 生成二维码
    QRCode.toDataURL(link).then(qrUrl => {
      this.setState({ qrUrl })
    })
    // 绑定复制事件
    document.addEventListener('copy', this._copy)
  }

  componentWillMount() {
    document.removeEventListener('copy', this._copy)
  }

  // 点击复制触发事件
  _copy = (e: ClipboardEvent) => {
    const { link } = this.props
    e.clipboardData.setData('text/plain', link)
    message.success('已复制')
    e.preventDefault()
  }

  render() {
    const { qrUrl } = this.state
    const { title, visible, link, onClose, onOk } = this.props
    return (
      <Modal
        visible={visible}
        title={title}
        footer={null}
        onClose={() => {
          onClose && onClose()
        }}
        onOk={() => {
          onOk && onOk()
        }}
      >
        <div>
          <div className="p-modalBody--share">
            <SvgIcon
              style={{ width: '90px', height: '100px' }}
              name={IconEnum.share}
            />
          </div>
          <div className="p-modalBody__share">
            <div className="l-flex l-ta__right">
              <div>分享链接</div>
              <div className="l-flex__item--full">
                <Button
                  plain
                  type="primary"
                  onClick={() => {
                    document.execCommand('copy')
                  }}
                >
                  复制
                </Button>
              </div>
            </div>
            <div className="l-pd__v--sm">{link}</div>
            <div className="l-ta__center l-pd__v--sm">
              <span>分享二维码: </span>
              <a href={qrUrl ? qrUrl : ''} download>
                下载
              </a>
            </div>
            <div className="l-ta__center p-modalBody__qrcode">
              {qrUrl && <img src={qrUrl} alt="link" />}
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

export { ModalShare }
