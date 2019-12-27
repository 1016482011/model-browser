import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import moment from 'moment'
import {
  Header,
  Button,
  Upload,
  Card,
  Progress,
  Modal,
  IconEnum,
  FontIcon,
  SvgIcon,
  ModelDel
} from '../components'
import { Input, Select, message } from 'antd'
import {
  uploadFileProgress,
  uploadFileProgressResult,
  getModelList,
  updateModelName,
  delModel,
  moveAndCopeModel
} from '../store/home/action'
import { ApplicationState } from '../store/rootReducer'
import { HomeState, HomeAction } from '../store/home/types'

interface HomeWindowProps {
  dispatch: Dispatch<HomeAction>
  history: any
  match: any
}

type Props = HomeWindowProps & HomeState

interface State {
  visible: boolean
  visibleStr: boolean
  visibleDel: boolean
  progressVis: string
  delTitle: string
  operTitle: string
  modelFileId: string
  modelName: string
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
      operTitle: '',
      modelName: '',
      modelFileId: '',
      selectGroupId: ''
    }
  }

  componentWillMount() {
    const {
      dispatch,
      match: {
        params: { id }
      }
    } = this.props
    dispatch(getModelList(id))
  }

  getBar = () => {
    const { selectModel, modelGroupList } = this.props
    let html: JSX.Element[] = []
    if (selectModel.model_files.length > 0) {
      selectModel.model_files.map(m => {
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
                  modelFileId: m.id
                })
              }}
              rightRender={() => <div />}
            />
          </li>
        )
      })
      return <div>{html}</div>
    }
  }
  render() {
    const {
      fileProgress,
      uploadResult,
      dispatch,
      modelGroupList,
      selectModel,
      history
    } = this.props
    const {
      visible,
      progressVis,
      visibleStr,
      visibleDel,
      selectGroupId,
      delTitle,
      operTitle
    } = this.state
    const modelName = selectModel && selectModel.name
    return (
      <div className="main">
        <div className="l-flex l-flex--col">
          <div className="l-flex__item">
            <Header />
          </div>
          <div className="l-flex__item--full bg-lightBlue">
            <div className="p-container">
              <div className="p-container__header">
                <span className="p-container__title">模型:{modelName}</span>
                <Button
                  plain
                  type="primary"
                  onClick={() => {
                    history.push('/modelview/1')
                  }}
                >
                  查看总模型
                </Button>
                <Button
                  type="primary"
                  style={{
                    marginRight: '10px',
                    float: 'right'
                  }}
                  onClick={() => {
                    this.setState({ visible: true })
                  }}
                >
                  编辑
                </Button>
                <Button
                  type="primary"
                  style={{
                    marginRight: '10px',
                    float: 'right'
                  }}
                  onClick={() => {
                    history.goBack()
                  }}
                >
                  返回
                </Button>
              </div>

              <div className="p-container__body">
                <ul className="l-float">
                  <li className="l-float__item">
                    <Upload
                      onChange={a => {
                        dispatch(uploadFileProgress(a))
                      }}
                      onComple={b => {
                        dispatch(uploadFileProgressResult(b))
                        dispatch(getModelList(selectModel.id))
                      }}
                      onSetState={val => {
                        this.setState({ progressVis: val })
                      }}
                      maxSiz={200000000}
                      modelId={selectModel.id}
                      title="添加子模型"
                      tip="限bin格式，大小不超过200M"
                    />
                  </li>
                  <li
                    style={{ display: progressVis }}
                    className="l-float__item"
                  >
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
        </div>
        {visible && (
          <Modal
            visible={visible}
            title="编辑模型"
            onClose={() => this.setState({ visible: false })}
            onOk={() => {
              dispatch(updateModelName(selectModel.id, this.state.modelName))
              this.setState({ visible: false })
            }}
          >
            <div className="p-modalBody">
              <div className="l-flex">
                <label className="p-modalBody__label">名称</label>
                <Input
                  defaultValue={modelName}
                  onChange={e => {
                    this.setState({
                      modelName: e.target.value
                    })
                  }}
                />
              </div>
            </div>
          </Modal>
        )}
        {visibleStr && (
          <Modal
            visible={visibleStr}
            title={`${operTitle}模型组`}
            onClose={() =>
              this.setState({ visibleStr: false, selectGroupId: '' })
            }
            onOk={() => {
              if (this.state.selectGroupId != '') {
                dispatch(moveAndCopeModel(1, this.state.selectGroupId))
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
                  {modelGroupList.map((opt, index) => {
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
        )}
        {visibleDel && (
          <ModelDel
            title="删除内容"
            content={`是否删除'${delTitle}'模型文件？`}
            visible={visibleDel}
            onClose={() => {
              this.setState({ visibleDel: false })
            }}
            onOk={() => {
              dispatch(delModel(this.state.modelFileId))
              this.setState({ visibleDel: false })
            }}
          />
        )}
      </div>
    )
  }
}

export default connect((state: ApplicationState) => state.home)(Home)
