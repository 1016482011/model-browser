import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Card, Button, Table, SvgIcon, IconEnum, ModelDel } from '..'
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

class CardTableContainer extends React.Component<Props, State> {
  state = {
    delVisible: false
  }
  // 边栏尾部
  sideFooterRender() {
    return (
      <div>
        <Button type="primary">添加构件属性</Button>
      </div>
    )
  }
  render() {
    const { delVisible } = this.state
    return (
      <div>
        <Card.Layout title={'构件属性'} footer={this.sideFooterRender()}>
          <div className="p-modeside__content">
            <Table
              hoverIcon={[
                <SvgIcon
                  key={0}
                  style={{ marginRight: '5px' }}
                  name={IconEnum.trash}
                  onClick={() => this.setState({ delVisible: true })}
                />,
                <SvgIcon key={1} name={IconEnum.edit} />
              ]}
              title={'类别1'}
            />
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

const CardTable = connect((state: ApplicationState) => state.modelview)(
  CardTableContainer
)

export { CardTable }
