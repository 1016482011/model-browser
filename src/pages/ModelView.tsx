import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Bustard } from 'bustard'
import { History } from 'history'
import {
  Header,
  SearchTree,
  ButtonGroup,
  CardClip,
  CardTable,
  CardMark,
  CardRoam
} from '../components'
import { setModelTool, modelViewInit } from '../store/modelview/action'
import { ApplicationState } from '../store/rootReducer'
import { ModelViewAction, ModelViewState } from '../store/modelview/types'

interface ModelProps {
  history: History
  dispatch: Dispatch<ModelViewAction>
}
type Props = ModelProps & ModelViewState
interface State {
  treeData: any
}

class ModelView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      treeData: []
    }
  }

  public el: HTMLDivElement | null = null

  componentDidMount() {
    const { dispatch } = this.props
    if (_.isNull(this.el)) throw Error('无法获取dom节点')
    const modelTool = new Bustard(this.el)
    const loader = modelTool.use(new Bustard.Loader())
    const modelLoader = modelTool.use(
      new Bustard.TreeLoader(
        'http://111.231.56.231:4000/api/v1',
        'ar.ifc.bin',
        'house'
      )
    )
    dispatch(setModelTool(modelTool, loader, modelLoader))
    dispatch(modelViewInit())
  }

  // 点击树触发事件
  onCheck = (checkedKeys: string[]) => {
    const { modelLoader, bustardLoader } = this.props
    if (_.isNull(modelLoader) || _.isNull(bustardLoader))
      throw '模型加载器初始化错误'
    modelLoader.loadModelByCodes(checkedKeys).then(v => {
      _.forEach(v, url => {
        bustardLoader.gltfLoadByUrl(url)
      })
    })
  }

  // 右边栏渲染
  sideRender() {
    const { sideActive } = this.props
    if (sideActive === 'showProps') return <CardTable />
    if (sideActive === 'mark') return <CardMark />
    if (sideActive === 'roam') return <CardRoam />
    if (sideActive === 'clip') return <CardClip />
    return
  }

  render() {
    return (
      <div className="main">
        <div className="l-flex l-flex--col">
          <div className="l-flex__item">
            <Header />
          </div>
          <div className="l-flex__item--full bg-lightBlue p-modelview">
            <div className="p-modelview__body">
              <div
                ref={el => {
                  this.el = el
                }}
                style={{ height: '100%', width: '100%' }}
              />
              <SearchTree onCheck={this.onCheck} />
              <div className="p-modelside">{this.sideRender()}</div>
              <div className="p-modelbottom">
                <ButtonGroup />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect((state: ApplicationState) => state.modelview)(ModelView)
