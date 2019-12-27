import React from 'react'
import _ from 'lodash'
interface Props {}

interface State {}

class Slider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
  }

  public elMove: HTMLDivElement | null = null

  public elBlock: HTMLDivElement | null = null

  public elBlockLeft: HTMLDivElement | null = null

  public moveBarWidth = 0

  public moveBarOriginWidth = 0

  public moveBarMargin = 0

  public activeBlock = 'left'

  public bodyDom = document.querySelector('body')

  public screenX = 0

  componentDidMount() {
    const bodyDom = this.bodyDom
    if (_.isNull(this.elMove) || _.isNull(bodyDom)) return
    this.moveBarOriginWidth = this.elMove.offsetWidth
    bodyDom.addEventListener('mouseup', this._upHandle)
  }

  _upHandle = () => {
    if (_.isNull(this.bodyDom)) return
    this.bodyDom.removeEventListener('mousemove', this._moveHandle)
  }

  _moveHandle = (event: MouseEvent) => {
    if (
      _.isNull(this.elMove) ||
      _.isNull(this.elBlock) ||
      _.isNull(this.elBlockLeft)
    )
      return
    if (this.activeBlock === 'left') {
      let width = this.moveBarWidth - event.screenX + this.screenX
      let marginOffset = this.moveBarMargin + event.screenX - this.screenX
      if (marginOffset < 0 || width < 0) return
      this.elMove.style.width = `${width}px`
      this.elMove.style.marginLeft = `${marginOffset}px`
      this.elBlockLeft.style.left = `${marginOffset}px`
    } else {
      let width =
        this.moveBarMargin + this.moveBarWidth + event.screenX - this.screenX
      let elMoveWidth = width - this.moveBarMargin
      if (elMoveWidth < 0 || width < 0 || width > this.moveBarOriginWidth)
        return
      this.elMove.style.width = `${elMoveWidth}px`
      this.elBlock.style.left = `${width}px`
    }
  }

  dragHandle = (d: string) => (e: React.MouseEvent) => {
    const bodyDom = this.bodyDom
    if (_.isNull(this.elMove) || _.isNull(bodyDom)) return
    this.screenX = e.screenX
    this.moveBarWidth = this.elMove.offsetWidth
    const moveBarMargin = window
      .getComputedStyle(this.elMove, null)
      .getPropertyValue('margin-left')
      .split('px')[0]
    this.moveBarMargin = parseInt(moveBarMargin)
    this.activeBlock = d
    bodyDom.addEventListener('mousemove', this._moveHandle)
  }

  componentWillUnmount() {
    if (_.isNull(this.bodyDom)) return
    this.bodyDom.removeEventListener('mouseup', this._upHandle)
  }

  render() {
    return (
      <div className="m-slider">
        <div className="m-slider__bar" />
        <div className="m-slider__move" ref={el => (this.elMove = el)}>
          <div
            ref={el => (this.elBlock = el)}
            className="m-slider__block m-slider__block--right"
            onMouseDown={this.dragHandle('right')}
          />
          <div
            ref={el => (this.elBlockLeft = el)}
            className="m-slider__block m-slider__block--Left"
            onMouseDown={this.dragHandle('left')}
          />
        </div>
      </div>
    )
  }
}

export { Slider }
