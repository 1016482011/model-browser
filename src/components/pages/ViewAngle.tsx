import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Bustard } from 'bustard'
import { IconEnum, IconButton, Popver } from '../index'
import { ApplicationState } from '../../store/rootReducer'
import { ModelViewState } from '../../store/modelview/types'

interface ViewAngleProps {}

type Props = ViewAngleProps & ModelViewState

class ViewAngleContaniner extends React.Component<Props, {}> {
  public list: { angle: string; icon: string; text: string }[] = [
    {
      angle: 'top',
      icon: IconEnum.top,
      text: '上'
    },
    {
      angle: 'bottom',
      icon: IconEnum.bottom,
      text: '下'
    },
    {
      angle: 'left',
      icon: IconEnum.left,
      text: '左'
    },
    {
      angle: 'right',
      icon: IconEnum.right,
      text: '右'
    },
    {
      angle: 'front',
      icon: IconEnum.front,
      text: '前'
    },
    {
      angle: 'back',
      icon: IconEnum.back,
      text: '后'
    }
  ]

  private rotateTool = new Bustard.Rotate()

  componentDidMount() {
    const { modelTool } = this.props
    if (_.isNull(modelTool)) throw Error('model不存在')
    this.rotateTool = modelTool.use(this.rotateTool)
  }

  // 点击留个面事件
  _viewAngleClick = (angle: string) => () => {
    const tool = this.rotateTool
    switch (angle) {
      case 'top':
        tool.rotateTop()
        break
      case 'bottom':
        tool.rotateBottom()
        break
      case 'left':
        tool.rotateLeft()
        break
      case 'right':
        tool.rotateRight()
        break
      case 'front':
        tool.rotateFront()
        break
      case 'back':
        tool.rotateBack()
        break
      default:
        console.warn('调用错误')
    }
  }

  render() {
    return (
      <ul className="p-viewangle">
        {this.list.map(item => (
          <li key={item.angle}>
            <Popver hoverText={item.text} position="left">
              <IconButton
                onClick={this._viewAngleClick(item.angle)}
                type={item.angle}
                icon={item.icon}
              />
            </Popver>
          </li>
        ))}
      </ul>
    )
  }
}
const ViewAngle = connect((state: ApplicationState) => state.modelview)(
  ViewAngleContaniner
)
export { ViewAngle }
