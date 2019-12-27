import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { SvgIcon, IconEnum } from '../../components'
import emptyLogo from '../../assets/img/logo.png'

interface Props {
  title: string
  tip: string
  hover?: boolean
  img?: string
  rightIcon?: boolean
  rightRender?: () => JSX.Element
  headerRender?: () => JSX.Element
  onDel?: () => any
  modelClick?: () => any
}

interface State {
  isHover: boolean
}

class Card extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isHover: false
    }
  }

  static Layout: any

  _hover = (isHover: boolean) => () => {
    const { hover } = this.props
    if (!hover) return
    this.setState({ isHover })
  }

  headerRender = () => {
    const { img, headerRender } = this.props
    if (headerRender) {
      return headerRender()
    }

    if (img) {
      return <img className="m-card__img" src={img} alt="model" />
    }
    return <img className="m-card__empty" src={emptyLogo} alt="empty" />
  }

  render() {
    const { tip, title, rightRender, rightIcon, onDel, modelClick } = this.props
    const { isHover } = this.state
    const contentClass = classNames({
      'm-card__content': true,
      'm-card__content--bg': rightIcon
    })
    return (
      <div
        className="m-card"
        onMouseOver={this._hover(true)}
        onMouseLeave={this._hover(false)}
        onDoubleClick={modelClick}
      >
        {isHover && (
          <div className="m-card__delBox">
            <div className="m-card__icon">
              <SvgIcon onClick={onDel} name={IconEnum.trash} />
            </div>
          </div>
        )}

        <div className="m-card__imgBox">{this.headerRender()}</div>
        <hr className="hr" />
        <div className={contentClass}>
          <div className="l-flex m-card__body">
            <div className="m-card__title">{title}</div>
            <div className="l-flex__item--full ">
              <div className="m-card__tool">{rightRender && rightRender()}</div>
            </div>
          </div>
          <div className="m-card__tip">{tip}</div>
        </div>
      </div>
    )
  }
}

export default Card
