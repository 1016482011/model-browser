import React from 'react'
import { Popover } from 'antd'

interface Props {
  title: string
  hoverIcon: JSX.Element[]
}

interface State {
  isHover: boolean
}

class Table extends React.Component<Props, State> {
  state = {
    isHover: false
  }

  _hover = (isHover: boolean) => () => {
    this.setState({ isHover })
  }

  rightRender = (value: string) => {
    if (value.length > 10)
      return (
        <Popover placement="topLeft" content={value} trigger="hover">
          <span>{value}</span>
        </Popover>
      )
    return <span>{value}</span>
  }

  hoverRender = () => {
    const { hoverIcon } = this.props
    const { isHover } = this.state
    if (isHover)
      return <div className="m-table__hover">{hoverIcon.map(item => item)}</div>

    return
  }

  render() {
    const { title } = this.props
    return (
      <div className="m-table">
        <div className="m-table__title ">{title}</div>
        <div
          className="m-table__item l-flex"
          onMouseOver={this._hover(true)}
          onMouseLeave={this._hover(false)}
        >
          <div className="m-table__Left l-flex__item--full">名称</div>
          <div className="l-flex__item--full">
            {this.rightRender('值少时诵')}
          </div>
          {this.hoverRender()}
        </div>
      </div>
    )
  }
}

export { Table }
