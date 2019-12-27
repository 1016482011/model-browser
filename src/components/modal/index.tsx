import React from 'react'
import ReactDOM from 'react-dom'
import _ from 'lodash'
import { Modal as ModalContainer, Props as ModalProps } from './Modal'

interface Props extends ModalProps {}

interface State {}

class Modal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  private el = document.createElement('div')

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(<ModalContainer {...this.props} />, this.el)
  }
}

export { Modal }
