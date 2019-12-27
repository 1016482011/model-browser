import React from 'react'
import { SvgIcon, IconEnum } from '../../components'
interface Props {
  title: string
  describe: string
  icon: IconEnum
  hoverIcon: JSX.Element[]
  iconStyle?: { [key: string]: string }
}

interface State {
  isHover: boolean
}

class CardTag extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isHover: false
    }
  }
  _hover = (isHover: boolean) => () => {
    this.setState({ isHover })
  }

  renderTagMark = () => {
    const { icon, iconStyle } = this.props
    return (
      <div className="m-cardTag__mark" style={iconStyle}>
        <SvgIcon style={{ width: '36px', height: '48px' }} name={icon} />
      </div>
    )
  }

  renderHover = () => {
    const { hoverIcon } = this.props
    const { isHover } = this.state
    if (isHover)
      return (
        <div className="m-cardTag__delBox">
          {hoverIcon.map((item, index) => {
            return (
              <div className="m-cardTag__icon" key={index}>
                {item}
              </div>
            )
          })}
        </div>
      )
    return
  }

  render() {
    const { title, describe } = this.props

    return (
      <div
        className="m-cardTag"
        onMouseOver={this._hover(true)}
        onMouseLeave={this._hover(false)}
      >
        {this.renderTagMark()}
        {this.renderHover()}
        <div className="m-cardTag__body">
          <div className="m-cardTag__text">
            <span>名称: </span>
            <span>{title}</span>
          </div>
          <div className="m-cardTag__text">
            <span>描述: </span>
            <span>{describe}</span>
          </div>
        </div>
      </div>
    )
  }
}

export { CardTag }
