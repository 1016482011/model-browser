import * as React from 'react'
import { treeContextTypes } from './contextTypes'
import {
  mapChildren,
  getPosition,
  arrDel,
  arrAdd,
  convertTreeToEntities,
  conductCheck
} from './utils'
import toArray from './toArray'
import * as types from './type'

interface Props extends types.treeProps {}

interface State extends types.treeState {}

export class Tree extends React.Component<Props, State> {
  static childContextTypes = treeContextTypes

  getChildContext() {
    return {
      rcTree: {
        renderTreeNode: this.renderTreeNode,
        onNodeExpand: this.onNodeExpand,
        onNodeCheck: this.onNodeCheck,
        onNodeClick: this.onNodeClick,
        onNodeSelect: this.onNodeSelect
      }
    }
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      treeNode: null,
      expandedKeys: [],
      newState: null,
      checkedKeys: [],
      halfCheckedKeys: [],
      keyEntities: {} as types.traverseTreeEntityData,
      selectedKeys: []
    }
  }

  static getDerivedStateFromProps(
    props: types.treeProps,
    prevState: types.treeState
  ) {
    const { prevProps } = prevState
    const newState: types.newState = {
      prevProps: props
    }

    function needSync(name: string) {
      return (
        (!prevProps && name in props) ||
        (prevProps && prevProps[name] !== props[name])
      )
    }

    // ================== Tree Node ==================
    let treeNode: types.treeNode = null

    // 检查children是否发生了变化，如果变化了更新state
    if (needSync('children')) {
      treeNode = toArray(props.children)
    }

    // 树的筛选功能将破坏树在虚拟dom的结构
    // 在此处将树节点缓存在状态中以便可以在事件触发时将节点信息返回出去
    if (treeNode) {
      newState.treeNode = treeNode

      // 计算出节点的实体数据以便快速匹配
      const entitiesMap = convertTreeToEntities(treeNode)
      newState.posEntities = entitiesMap.posEntities
      newState.keyEntities = entitiesMap.keyEntities
    }

    const keyEntities = newState.keyEntities || prevState.keyEntities

    // ================= checkedKeys =================
    let checkedKeyEntity: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    } | null = null

    if (treeNode) {
      // 如果树的节点发生了变化，我们也需要检查它
      checkedKeyEntity = {
        checkedKeys: prevState.checkedKeys,
        halfCheckedKeys: prevState.halfCheckedKeys
      }
    }
    if (checkedKeyEntity) {
      let { checkedKeys = [], halfCheckedKeys = [] } = checkedKeyEntity

      const conductKeys = conductCheck(checkedKeys, true, keyEntities)
      checkedKeys = conductKeys.checkedKeys
      halfCheckedKeys = conductKeys.halfCheckedKeys

      newState.checkedKeys = checkedKeys
      newState.halfCheckedKeys = halfCheckedKeys
    }

    if (treeNode) {
      newState.treeNode = treeNode
    }

    return newState
  }

  // 节点点击事件
  onNodeClick = (e: any, treeNode: any) => {}

  onNodeCheck = (
    e: React.MouseEvent<HTMLSpanElement>,
    treeNode: any,
    checked: boolean
  ) => {
    const {
      keyEntities,
      checkedKeys: oriCheckedKeys,
      halfCheckedKeys: oriHalfCheckedKeys
    } = this.state
    console.log(keyEntities)
    const {
      props: { eventKey }
    } = treeNode

    // 返回给外部的事件触发参数
    let checkedObj
    const eventObj: any = {
      event: 'check',
      node: treeNode,
      checked,
      nativeEvent: e.nativeEvent
    }
    console.log([eventKey], checked, keyEntities, {
      checkedKeys: oriCheckedKeys,
      halfCheckedKeys: oriHalfCheckedKeys
    })
    const { checkedKeys, halfCheckedKeys } = conductCheck(
      [eventKey],
      checked,
      keyEntities,
      {
        checkedKeys: oriCheckedKeys,
        halfCheckedKeys: oriHalfCheckedKeys
      }
    )

    checkedObj = checkedKeys

    eventObj.checkedNodes = []
    eventObj.checkedNodesPositions = []
    eventObj.halfCheckedKeys = halfCheckedKeys

    checkedKeys.forEach((key: string) => {
      const entity = keyEntities[key]
      if (!entity) return

      const { node, pos } = entity

      eventObj.checkedNodes.push(node)
      eventObj.checkedNodesPositions.push({ node, pos })
    })

    this.setUncontrolledState({
      checkedKeys,
      halfCheckedKeys
    })
  }

  /**
   * 只更新不在props里的值
   */
  setUncontrolledState = (state: any) => {
    let needSync = false
    const newState: any = {}
    Object.keys(state).forEach(name => {
      if (name in this.props) return

      needSync = true
      newState[name] = state[name]
    })
    if (needSync) {
      this.setState(newState)
    }
  }

  // 点击节点展开事件
  onNodeExpand = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    treeNode: React.ReactElement<Props>
  ) => {
    let { expandedKeys } = this.state
    const { eventKey, expanded } = treeNode.props
    const index = expandedKeys.indexOf(eventKey)
    const targetExpanded = !expanded
    console.log(expandedKeys)
    if (targetExpanded) {
      expandedKeys = arrAdd(expandedKeys, eventKey)
    } else {
      expandedKeys = arrDel(expandedKeys, eventKey)
    }
    this.setUncontrolledState({ expandedKeys })
    return null
  }

  onNodeSelect = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    treeNode: any
  ) => {
    let { selectedKeys } = this.state
    const { keyEntities } = this.state
    const { selected, eventKey } = treeNode.props
    const targetSelected = !selected

    // Update selected keys
    if (!targetSelected) {
      selectedKeys = arrDel(selectedKeys, eventKey)
    } else {
      selectedKeys = arrAdd(selectedKeys, eventKey)
    }

    // [Legacy] Not found related usage in doc or upper libs
    const selectedNodes = selectedKeys
      .map((key: string) => {
        const entity = keyEntities[key]
        if (!entity) return null

        return entity.node
      })
      .filter((node: any) => node)

    this.setUncontrolledState({ selectedKeys })

    const eventObj = {
      event: 'select',
      selected: targetSelected,
      node: treeNode,
      selectedNodes,
      nativeEvent: e.nativeEvent
    }
    console.log(selectedKeys, eventObj)
  }

  isKeyChecked = (key: any) => {
    const { checkedKeys } = this.state
    return checkedKeys.indexOf(key) !== -1
  }

  // 渲染树节点
  renderTreeNode = (
    child: React.ReactElement<Props>,
    index: number,
    level = 0
  ) => {
    const { expandedKeys, halfCheckedKeys, selectedKeys } = this.state
    const pos = getPosition(level, index)
    const key = child.key + '' || pos
    const newProps = {
      key,
      eventKey: key,
      expanded: expandedKeys.indexOf(key) !== -1,
      pos,
      checked: this.isKeyChecked(key),
      halfChecked: halfCheckedKeys.indexOf(key) !== -1,
      selected: selectedKeys.indexOf(key) !== -1
    }
    return React.cloneElement<Props>(child, newProps)
  }

  public render() {
    const { treeNode } = this.state
    return (
      <ul>
        {mapChildren(
          treeNode,
          (node: React.ReactElement<Props>, index: number) =>
            this.renderTreeNode(node, index)
        )}
      </ul>
    )
  }
}
