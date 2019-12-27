import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import {
  Card,
  CardTag,
  Button,
  IconEnum,
  SvgIcon,
  ModelDel,
  ModalShare
} from '..'
import { ApplicationState } from '../../store/rootReducer'
import { ModelViewAction } from '../../store/modelview/types'
import { ModelViewState } from '../../store/modelview/types'

interface CardProps {
  dispatch: Dispatch<ModelViewAction>
}
type Props = CardProps & ModelViewState
interface State {
  delVisible: boolean
  shareVisible: boolean
}

class CardRoamContainer extends React.Component<Props, State> {
  state = {
    delVisible: false,
    shareVisible: false
  }
  // 边栏尾部
  sideFooterRender() {
    return (
      <div>
        <Button type="primary">新增漫游</Button>
      </div>
    )
  }
  render() {
    const { delVisible, shareVisible } = this.state
    return (
      <div>
        <Card.Layout title="漫游列表" footer={this.sideFooterRender()}>
          <div className="p-modeside__content">
            <div className="l-pd__v">
              <CardTag
                icon={IconEnum.play}
                iconStyle={{ left: '-3px', top: '-11px' }}
                describe="这里是描述"
                title="这里是标签名称"
                hoverIcon={[
                  <SvgIcon name={IconEnum.trash} />,
                  <SvgIcon name={IconEnum.share} />
                ]}
              />
            </div>
            <div className="l-pd__v">
              <CardTag
                icon={IconEnum.play}
                iconStyle={{ left: '-3px', top: '-11px' }}
                describe="这里是描述"
                title="这里是标签名称"
                hoverIcon={[
                  <SvgIcon
                    onClick={() => this.setState({ delVisible: true })}
                    name={IconEnum.trash}
                  />,
                  <SvgIcon
                    onClick={() => this.setState({ shareVisible: true })}
                    name={IconEnum.share}
                  />
                ]}
              />
            </div>
          </div>
        </Card.Layout>
        <ModelDel
          title="删除内容"
          content="是否删除"
          visible={delVisible}
          onClose={() => this.setState({ delVisible: false })}
          onOk={() => this.setState({ delVisible: false })}
        />
        <ModalShare
          title="分享"
          link={'https://tower.im/teams/540346'}
          onClose={() => this.setState({ shareVisible: false })}
          onOk={() => this.setState({ shareVisible: false })}
          visible={shareVisible}
        />
      </div>
    )
  }
}

const CardRoam = connect((state: ApplicationState) => state.modelview)(
  CardRoamContainer
)

export { CardRoam }
