import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Dispatch } from 'redux'
import { Bustard } from 'bustard'
import { Color, Measure, Translate, Mark } from 'bustard/lib/tools'
import { IconEnum, ViewAngle, Clip, Popver, IconButton } from '../index'
import { ApplicationState } from '../../store/rootReducer'
import { setSideActive } from '../../store/modelview/action'
import { ModelViewState, ModelViewAction } from '../../store/modelview/types'

interface ButtonGroupProps {
  dispatch: Dispatch<ModelViewAction>
}
type Props = ButtonGroupProps & ModelViewState
interface State {
  toolList: {
    icon: string
    activeIcon?: string
    key: string
    hoverText: string
    activeText?: string
    activeRender?: () => JSX.Element
  }[]
  clickActive: string[]
}

class ButtonGroupContaniner extends React.Component<Props, State> {
  state: State = {
    toolList: [
      {
        key: 'direct',
        icon: IconEnum.direct,
        hoverText: '方向',
        activeRender: () => {
          return <ViewAngle />
        }
      },
      {
        key: 'color',
        icon: IconEnum.setColor,
        activeIcon: IconEnum.removeColor,
        hoverText: '染色',
        activeText: '取消染色'
      },
      {
        key: 'showProps',
        icon: IconEnum.props,
        hoverText: '属性',
        activeText: '关闭'
      },
      {
        key: 'distance',
        icon: IconEnum.distance,
        activeIcon: IconEnum.distanceCancel,
        hoverText: '测距',
        activeText: '清除'
      },
      {
        key: 'translate',
        icon: IconEnum.translate,
        hoverText: '平移',
        activeText: '恢复'
      },
      {
        key: 'mark',
        icon: IconEnum.markStart,
        activeIcon: IconEnum.markDel,
        hoverText: '标记',
        activeText: '清除'
      },
      {
        key: 'clip',
        icon: IconEnum.clip,
        hoverText: '剪切',
        activeText: '恢复',
        activeRender: () => {
          return <Clip />
        }
      },
      {
        key: 'roam',
        icon: IconEnum.roam,
        activeIcon: IconEnum.roamCancel,
        hoverText: '漫游',
        activeText: '停止'
      },
      {
        key: 'reset',
        icon: IconEnum.reset,
        hoverText: '复原'
      }
    ],
    clickActive: []
  }

  private colorTool: Color | null = null
  private measureTool: Measure | null = null
  private translateTool: Translate | null = null
  private markTool: Mark | null = null

  // 获取模型工具以及初始化工具
  getModelTool = () => {
    const { modelTool } = this.props
    if (_.isNull(modelTool)) throw Error('model不存在')
    if (_.isNull(this.colorTool)) {
      this.colorTool = modelTool.use(new Bustard.Color({}))
      this.colorTool.activeClick = false
    }

    if (_.isNull(this.measureTool)) {
      this.measureTool = modelTool.use(new Bustard.Measure())
      this.measureTool.activeClick = false
    }

    if (_.isNull(this.translateTool))
      this.translateTool = modelTool.use(new Bustard.Translate())
    if (_.isNull(this.markTool)) {
      this.markTool = modelTool.use(new Bustard.Mark())
      this.markTool.activeClick = false
    }
    return {
      colorTool: this.colorTool,
      measureTool: this.measureTool,
      translateTool: this.translateTool,
      markTool: this.markTool,
      modelTool
    }
  }

  // 底部按钮组点击
  _IconButtonClik(e: string) {
    const { dispatch } = this.props
    const { clickActive } = this.state
    const {
      colorTool,
      measureTool,
      translateTool,
      markTool
    } = this.getModelTool()
    dispatch(setSideActive(e))
    const isChecked = _.indexOf(clickActive, e) === -1
    switch (e) {
      case 'color':
        isChecked
          ? (colorTool.activeClick = true)
          : (colorTool.activeClick = false)
        break
      case 'distance':
        isChecked
          ? (measureTool.activeClick = true)
          : (measureTool.activeClick = false)
        break
      case 'translate':
        translateTool.setOrthographicCamera()
        break
      case 'mark':
        isChecked
          ? (markTool.activeClick = true)
          : (markTool.activeClick = false)
        break
      case 'roam':
        break
      case 'reset':
        this.setState({ clickActive: [] })
        return
      case 'showProps':
        break
      default:
        break
    }
    isChecked ? clickActive.push(e) : _.pull(clickActive, e)
    this.setState({ clickActive: clickActive })
  }
  render() {
    const { toolList, clickActive } = this.state
    return (
      <ul>
        {toolList.map(item => {
          const active = _.indexOf(clickActive, item.key) > -1
          const activeHover = _.isNil(item.activeText)
            ? item.hoverText
            : item.activeText
          const hoverText = `${active ? activeHover : item.hoverText}`
          return (
            <li key={item.key}>
              <Popver
                hoverText={hoverText}
                active={active}
                activeRender={item.activeRender}
              >
                <IconButton
                  onClick={e => this._IconButtonClik(e)}
                  type={item.key}
                  icon={item.icon}
                  radius
                  active={active}
                  activeIcon={item.activeIcon}
                />
              </Popver>
            </li>
          )
        })}
      </ul>
    )
  }
}

const ButtonGroup = connect((state: ApplicationState) => state.modelview)(
  ButtonGroupContaniner
)

export { ButtonGroup }
