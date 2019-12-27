import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card, CardImg, IconEnum, Button, SvgIcon, ModelDel } from '../'
import { ApplicationState } from '../../store/rootReducer'
import { ModelViewAction } from '../../store/modelview/types'
import { ModelViewState } from '../../store/modelview/types'

interface CardProps {
  dispatch: Dispatch<ModelViewAction>
}
type Props = CardProps & ModelViewState
interface State {
  delVisible: boolean
}

class CardClipContainer extends React.Component<Props, State> {
  state = {
    delVisible: false
  }
  // 边栏尾部
  sideFooterRender() {
    return (
      <div>
        <Button type="primary">保存剖切状态</Button>
      </div>
    )
  }
  render() {
    const { delVisible } = this.state
    return (
      <div>
        <Card.Layout title="剖切列表" footer={this.sideFooterRender()}>
          <div className="p-modeside__content">
            <div className="l-pd__v">
              <CardImg
                hoverIcon={[
                  <SvgIcon
                    name={IconEnum.trash}
                    onClick={() => this.setState({ delVisible: true })}
                  />,
                  <SvgIcon name={IconEnum.edit} />
                ]}
                img="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551512285167&di=2bc62c8d6cd3fc31fff04de3ea27db55&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F10%2F38%2F09858PICzi5.jpg"
                title="剖切面"
                extra="2019/01/21"
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
      </div>
    )
  }
}

const CardClip = connect((state: ApplicationState) => state.modelview)(
  CardClipContainer
)

export { CardClip }
