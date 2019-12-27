import React from 'react'
import { IconEnum, SvgIcon, Modal } from '../index'

interface Props {
  visible: boolean
  title: string
  content: string
  onClose?: () => any
  onOk?: () => any
}

interface State {}

class ModelDel extends React.Component<Props, State> {
  render() {
    const { title, content, visible, onOk, onClose } = this.props
    return (
      <Modal
        visible={visible}
        title={title}
        onClose={() => {
          onClose && onClose()
        }}
        onOk={() => {
          onOk && onOk()
        }}
      >
        <div>
          <div className="p-modalBody--del">
            <SvgIcon
              style={{ width: '90px', height: '100px' }}
              name={IconEnum.trashDanger}
            />
          </div>
          <div className="p-modalBody__delText">{content}</div>
        </div>
      </Modal>
    )
  }
}

export { ModelDel }
