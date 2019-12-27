import React from 'react'

export interface Props {
  title: string
  footer?: null | JSX.Element
}

export interface State {}

class Card extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    const { children, footer, title } = this.props
    return (
      <div className="m-cardLay">
        <div className="m-cardLay__header">
          <span>{title}</span>
        </div>
        <div className="m-cardLay__body">{children}</div>
        <div className="m-cardLay__footer">{footer}</div>
      </div>
    )
  }
}

export default Card
