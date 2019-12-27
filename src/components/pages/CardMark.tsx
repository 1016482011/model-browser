import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card, CardTag, Button, IconEnum, SvgIcon } from '..'
import { ApplicationState } from '../../store/rootReducer'
import { ModelViewAction } from '../../store/modelview/types'
import { ModelViewState } from '../../store/modelview/types'

interface CardProps {
  dispatch: Dispatch<ModelViewAction>
}
type Props = CardProps & ModelViewState
interface State {}

class CardMarkContainer extends React.Component<Props, State> {
  // 边栏尾部
  sideFooterRender() {
    return (
      <div>
        <Button type="primary">新增标签</Button>
      </div>
    )
  }
  render() {
    return (
      <Card.Layout title="标记列表" footer={this.sideFooterRender()}>
        <div className="p-modeside__content">
          <div className="l-pd__v">
            <CardTag
              icon={IconEnum.mark}
              describe="这里是描述"
              title="这里是标签名称"
              hoverIcon={[
                <SvgIcon name={IconEnum.trash} />,
                <SvgIcon name={IconEnum.edit} />
              ]}
            />
          </div>
          <div className="l-pd__v">
            <CardTag
              icon={IconEnum.mark}
              describe="这里是描述"
              title="这里是标签名称"
              hoverIcon={[
                <SvgIcon name={IconEnum.trash} />,
                <SvgIcon name={IconEnum.edit} />
              ]}
            />
          </div>
        </div>
      </Card.Layout>
    )
  }
}

const CardMark = connect((state: ApplicationState) => state.modelview)(
  CardMarkContainer
)

export { CardMark }
