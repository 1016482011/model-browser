import React from 'react'
import _ from 'lodash'
interface Props {
  hoverText: string
  activeRender?: undefined | (() => JSX.Element)
  active?: boolean
  position?: string
}

interface State {
  width: number
  height: number
  isHover: boolean
}
// 应当将内容放到body下，定位最为方便
class Popver extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      isHover: false
    }
  }
  public ref: HTMLDivElement | null = null
  componentDidMount() {
    if (_.isNull(this.ref)) return
    const childNode = this.ref.childNodes[0] as HTMLDivElement
    this.setState({
      width: childNode.offsetWidth,
      height: childNode.offsetHeight
    })
  }

  activeRender() {
    const { hoverText, active, activeRender, position } = this.props
    const { isHover, width, height } = this.state
    if (active && !_.isUndefined(activeRender)) {
      return activeRender()
    }
    if (isHover && position === 'left') {
      return (
        <div className="m-popover__bubble--left" style={{ left: '-56px' }}>
          {hoverText}
        </div>
      )
    } else if (isHover) {
      return (
        <div
          className="m-popover__bubble"
          style={{ left: `-${(70 - width) / 2}px`, top: '-100px' }}
        >
          {hoverText}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="m-popover">
        {this.activeRender()}
        <div
          ref={el => (this.ref = el)}
          onMouseEnter={() => this.setState({ isHover: true })}
          onMouseLeave={() => this.setState({ isHover: false })}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export { Popver }
