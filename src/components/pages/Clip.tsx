import React from 'react'
import { Slider } from 'antd'
import { connect } from 'react-redux'
import { Bustard } from 'bustard'
import { Clip as ClipTool } from 'bustard/lib/tools'
import _ from 'lodash'
import { ApplicationState } from '../../store/rootReducer'
import { ModelViewState } from '../../store/modelview/types'
import { SliderValue } from 'antd/lib/slider'

interface ClipPorps {}
type Props = ClipPorps & ModelViewState

interface State {}

class ClipContainer extends React.Component<Props, State> {
  private clipTool: ClipTool | null = null

  // 获取模型工具以及初始化工具
  getModelTool = () => {
    const { modelTool } = this.props
    if (_.isNull(modelTool)) throw Error('model不存在')
    if (_.isNull(this.clipTool)) {
      this.clipTool = modelTool.use(new Bustard.Clip())
      this.clipTool.restore()
    }
    return {
      clipTool: this.clipTool,
      modelTool
    }
  }

  // 滑动组件变化触发事件
  _onSliderChanage = (d: string) => (e: SliderValue) => {
    if (!_.isArray(e)) return
    const { clipTool } = this.getModelTool()
    clipTool.clip(d, e)
  }

  render() {
    return (
      <div className="p-clip">
        <div className="p-clip__main">
          <div>
            <div className="l-flex ">
              <div className="p-clip__axis">
                <span>x:</span>
              </div>
              <div className="l-flex__item--full p-clip__slider">
                <Slider
                  range
                  defaultValue={[0, 100]}
                  onChange={this._onSliderChanage('x')}
                />
              </div>
            </div>
            <div className="l-flex">
              <div className="p-clip__axis">
                <span>y:</span>
              </div>
              <div className="l-flex__item--full p-clip__slider">
                <Slider
                  range
                  defaultValue={[0, 100]}
                  onChange={this._onSliderChanage('y')}
                />
              </div>
            </div>
            <div className="l-flex">
              <div className="p-clip__axis">
                <span>z:</span>
              </div>
              <div className="l-flex__item--full p-clip__slider">
                <Slider
                  range
                  defaultValue={[0, 100]}
                  onChange={this._onSliderChanage('z')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const Clip = connect((state: ApplicationState) => state.modelview)(
  ClipContainer
)
export { Clip }
