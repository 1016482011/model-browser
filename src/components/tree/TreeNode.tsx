import * as React from 'react'
import { mapChildren, getNodeChildren, warnOnlyTreeNode } from './utils'
import toArray from './toArray'
import { nodeContextTypes } from './contextTypes'
interface Props {
  title: string
  pos?: string
  expanded?: boolean
  checked?: boolean
  halfChecked?: boolean
  selected?: boolean
  eventKey?: string
}

interface State {}

class TreeNode extends React.Component<Props, State> {
  static contextTypes = nodeContextTypes

  static childContextTypes = nodeContextTypes

  // 用来判断此节点是否为树节点
  static isTreeNode = 1

  constructor(props: Props) {
    super(props)
  }

  getChildContext() {
    return {
      ...this.context,
      rcTreeNode: {
        // onUpCheckConduct: this.onUpCheckConduct,
      }
    }
  }

  // 获取子元素
  getNodeChildren = () => {
    const { children } = this.props
    const originList = toArray(children).filter(node => node)
    const targetList = getNodeChildren(originList)
    if (originList.length !== targetList.length) {
      warnOnlyTreeNode()
    }

    return targetList
  }

  // 点击展开事件
  onExpand = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const {
      rcTree: { onNodeExpand }
    } = this.context
    onNodeExpand(e, this)
  }

  onSelect = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const {
      rcTree: { onNodeSelect }
    } = this.context
    e.preventDefault()
    onNodeSelect(e, this)
  }

  onSelectorClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    // Click trigger before select/check operation
    const {
      rcTree: { onNodeClick }
    } = this.context
    onNodeClick(e, this)

    this.onSelect(e)
  }

  // 渲染切换按钮
  renderSwitcher = () => {
    return <span onClick={this.onExpand}>点击展开</span>
  }

  isLeaf = () => {
    const hasChildren = this.getNodeChildren().length !== 0
    return !hasChildren
  }

  getNodeState = () => {
    const { expanded } = this.props

    if (this.isLeaf()) {
      return 'is leaf'
    }

    return expanded ? 'ICON_OPEN' : 'ICON_CLOSE'
  }

  renderIcon = () => {
    return <span>{this.getNodeState()}</span>
  }

  // 图标和标题
  renderSelector = () => {
    const { title, selected } = this.props
    return (
      <span
        title={typeof title === 'string' ? title : ''}
        onClick={this.onSelectorClick}
      >
        {this.renderIcon()}
        {title}
      </span>
    )
  }

  // 渲染节点的子元素
  renderChildren = () => {
    const { expanded, pos } = this.props
    const {
      rcTree: { renderTreeNode }
    } = this.context

    // 子节点元素
    const nodeList = this.getNodeChildren()
    if (nodeList.length === 0) {
      return null
    }
    if (expanded) {
      return (
        <ul>
          {mapChildren(nodeList, (node: any, index: string) =>
            renderTreeNode(node, index, pos)
          )}
        </ul>
      )
    }
  }

  onCheck = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const { checked } = this.props
    const {
      rcTree: { onNodeCheck }
    } = this.context

    e.preventDefault()
    const targetChecked = !checked
    onNodeCheck(e, this, targetChecked)
  }

  // Checkbox
  renderCheckbox = () => {
    const { checked, halfChecked } = this.props

    return (
      <span onClick={this.onCheck}>
        {checked ? '选中|' : '未选中|'}
        {halfChecked ? '半选中|' : '未半选中|'}
      </span>
    )
  }

  public render() {
    return (
      <li>
        {this.renderSwitcher()}
        {this.renderCheckbox()}
        {this.renderSelector()}
        {this.renderChildren()}
      </li>
    )
  }
}

export { TreeNode }
