import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { History } from 'history'
import moment from 'moment'
import { Select, message } from 'antd'
import _ from 'lodash'
import {
  Header,
  Upload,
  Card,
  Progress,
  Modal,
  IconEnum,
  SvgIcon,
  ModelDel
} from '../components'
import {
  uploadFileProgress,
  uploadFileProgressResult,
  getModelList,
  delModel,
  moveAndCopeModel
} from '../store/home/action'
import { ApplicationState } from '../store/rootReducer'
import { HomeState, HomeAction } from '../store/home/types'
import { node } from 'prop-types'

interface HomeWindowProps {
  dispatch: Dispatch<HomeAction>
  history: History
}

type Props = HomeWindowProps & HomeState

interface State {
  visible: boolean
  visibleStr: boolean
  visibleDel: boolean
  progressVis: string
  delTitle: string
  selectModelId: string
  operTitle: string
  selectGroupId: string
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      visible: false,
      visibleStr: false,
      visibleDel: false,
      progressVis: 'none',
      delTitle: '',
      selectModelId: '',
      operTitle: '',
      selectGroupId: ''
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(getModelList())
  }

  getBar = () => {
    const { modeList, modelGroupList, history, dispatch } = this.props
    let html: JSX.Element[] = []
    modeList.map(m => {
      html.push(
        <li key={m.id} className="l-float__item">
          <Card
            hover
            title={m.name}
            tip={moment(m.updated_at).format('YYYY-MM-DD')}
            img="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551512285167&di=2bc62c8d6cd3fc31fff04de3ea27db55&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F10%2F38%2F09858PICzi5.jpg"
            onDel={() => {
              this.setState({
                visibleDel: true,
                delTitle: m.name,
                selectModelId: m.id
              })
            }}
            modelClick={() => {
              history.push('modelview/' + m.id)
            }}
            rightRender={() => (
              <div>
                <SvgIcon
                  title="移动"
                  name={IconEnum.remove}
                  style={{ marginRight: '5px' }}
                  onClick={() => {
                    this.setState({
                      visibleStr: true,
                      operTitle: '移动',
                      selectModelId: m.id
                    })
                  }}
                />
                <SvgIcon
                  title="复制"
                  name={IconEnum.cope}
                  style={{ marginRight: '5px' }}
                  onClick={() => {
                    this.setState({
                      visibleStr: true,
                      operTitle: '复制',
                      selectModelId: m.id
                    })
                  }}
                />
                <SvgIcon
                  title="子模型"
                  name={IconEnum.childModel}
                  onClick={() => {
                    history.push('homeChild/' + m.id)
                  }}
                />
              </div>
            )}
          />
        </li>
      )
    })
    return <div>{html}</div>
  }
  render() {
    const { fileProgress, uploadResult, dispatch, modelGroupList } = this.props
    const {
      visible,
      progressVis,
      visibleStr,
      visibleDel,
      selectGroupId,
      delTitle,
      selectModelId,
      operTitle
    } = this.state
    return (
      <div className="main">
        <div className="l-flex l-flex--col">
          <div className="l-flex__item">
            <Header />
          </div>
          <div className="l-flex__item--full bg-lightBlue">
            <div className="p-container">
              <ul className="l-float">
                <li className="l-float__item">
                  <Upload
                    onChange={a => {
                      dispatch(uploadFileProgress(a))
                    }}
                    onComple={b => {
                      //1.上传完成后提示上传结果
                      //2.更新reducer 中上传结果状态
                      //3.从新获取模型列表数据
                      dispatch(uploadFileProgressResult(b))
                      dispatch(getModelList())
                    }}
                    onSetState={val => {
                      this.setState({ progressVis: val })
                    }}
                    maxSiz={200000000}
                    title="添加模型"
                    tip="限bin格式，大小不超过200M"
                  />
                </li>
                <li style={{ display: progressVis }} className="l-float__item">
                  <Card
                    title="模型名称.bin"
                    tip="最近更新：2019/02/12"
                    headerRender={() => {
                      return (
                        <div className="p-progress">
                          {
                            //上传完成之后 进度条消失，启动转换遮罩
                            <Progress
                              progress={fileProgress}
                              uploadResult={uploadResult}
                            />
                          }
                        </div>
                      )
                    }}
                  />
                </li>
                {this.getBar()}
              </ul>
            </div>
          </div>
        </div>
        <Modal
          visible={visibleStr}
          title={`${operTitle}模型组`}
          onClose={() =>
            this.setState({ visibleStr: false, selectGroupId: '' })
          }
          onOk={() => {
            if (this.state.selectGroupId != '') {
              dispatch(
                moveAndCopeModel(
                  this.state.selectGroupId,
                  this.state.selectModelId,
                  operTitle == '移动' ? false : true
                )
              )
              this.setState({ visibleStr: false })
            } else {
              message.error('请选择模型组！')
            }
          }}
        >
          <div className="p-modalBody">
            <div className="l-flex">
              <label className="p-modalBody__label">名称</label>
              <Select
                style={{ width: '100% ' }}
                onChange={value => {
                  this.setState({ selectGroupId: value.toString() })
                }}
                value={selectGroupId}
              >
                {_.filter(
                  modelGroupList,
                  node => node.id !== this.state.selectModelId
                ).map((opt, index) => {
                  let { id, name } = opt
                  return (
                    <Select.Option key={index} value={id}>
                      {name}
                    </Select.Option>
                  )
                })}
              </Select>
            </div>
          </div>
        </Modal>
        <ModelDel
          title="删除内容"
          content={`是否删除'${delTitle}'及其子模型？`}
          visible={visibleDel}
          onClose={() => {
            this.setState({ visibleDel: false })
          }}
          onOk={() => {
            dispatch(delModel(selectModelId))
            this.setState({ visibleDel: false })
          }}
        />
      </div>
    )
  }
}

export default connect((state: ApplicationState) => state.home)(Home)
