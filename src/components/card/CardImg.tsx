import React from 'react'
import { SvgIcon, IconEnum } from '../../components'
interface Props {
  img: string
  title: string
  extra: string
  hoverIcon: JSX.Element[]
}

interface State {
  isHover: boolean
}

class CardImg extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isHover: false
    }
  }
  _hover = (isHover: boolean) => () => {
    this.setState({ isHover })
  }

  renderHover = () => {
    const { isHover } = this.state
    const { hoverIcon } = this.props
    if (isHover)
      return (
        <div className="m-cardImg__delBox">
          {hoverIcon.map((item, index) => (
            <div className="m-cardImg__icon" key={index}>
              {item}
            </div>
          ))}
        </div>
      )

    return
  }

  render() {
    const { img, title, extra } = this.props
    const { isHover } = this.state
    return (
      <div
        className="m-cardImg"
        onMouseOver={this._hover(true)}
        onMouseLeave={this._hover(false)}
      >
        {this.renderHover()}
        <div className="m-cardImg__img">
          <img src={img} />
        </div>
        <div className="l-flex m-cardImg__body">
          <div className="l-flex__item--full">
            <span>{title}</span>
          </div>
          <div>
            <span className="m-cardImg__time">{extra}</span>
          </div>
        </div>
      </div>
    )
  }
}

export { CardImg }
