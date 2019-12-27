import React, { Children } from 'react'
import toArray from './toArray'
import * as types from './type'

let onlyTreeNodeWarned = false

export function warnOnlyTreeNode() {
  if (onlyTreeNodeWarned) return

  onlyTreeNodeWarned = true
  console.warn('Tree only accept TreeNode as children.')
}

/**
 * Use `rc-util` `toArray` to get the children list which keeps the key.
 * And return single node if children is only one(This can avoid `key` missing check).
 */
export function mapChildren(children: any, func: any) {
  const list = toArray(children).map(func)
  if (list.length === 1) {
    return list[0]
  }
  return list
}

export function isTreeNode(
  node: null | undefined | { type?: { isTreeNode?: boolean } }
) {
  return node && node.type && node.type.isTreeNode
}

export function getNodeChildren(children: types.treeNode) {
  return toArray(children).filter(isTreeNode)
}

export function getPosition(level: React.ReactText, index: number) {
  return `${level}-${index}`
}

export function arrDel(list: any, value: any) {
  const clone = list.slice()
  const index = clone.indexOf(value)
  if (index >= 0) {
    clone.splice(index, 1)
  }
  return clone
}

export function arrAdd(list: any[], value: any) {
  const clone = list.slice()
  if (clone.indexOf(value) === -1) {
    clone.push(value)
  }
  return clone
}

/**
 * 计算树节点列表
 * @param treeNodes
 */
export function convertTreeToEntities(treeNodes: types.treeNode) {
  const posEntities: { [key: string]: types.treeToEntities } = {} as any
  const keyEntities: { [key: string]: types.treeToEntities } = {} as any
  let wrapper = {
    posEntities,
    keyEntities
  }

  traverseTreeNodes(treeNodes, (item: types.traverseTreeNodesData) => {
    const { node, index, pos, key, parentPos } = item
    const entity: types.traverseTreeEntityData = { node, index, key, pos }

    posEntities[pos] = entity
    keyEntities[key] = entity

    // 填充节点children
    entity.parent = parentPos && posEntities[parentPos]
    if (entity.parent) {
      entity.parent.children = entity.parent.children || []
      entity.parent.children.push(entity)
    }
  })
  return wrapper
}

// 遍历节点树
export function traverseTreeNodes(
  treeNodes: types.treeNode,
  callback: (item: types.traverseTreeNodesData) => void
) {
  function processNode(
    node: React.ReactElement<any> | null,
    index: number,
    parent: { node: React.ReactElement<any> | null; pos: string }
  ) {
    const children = node ? node.props.children : treeNodes
    const pos = node ? getPosition(parent.pos, index) : '0'

    // 过滤children节点
    const childList = getNodeChildren(children)

    // 处理非根节点node
    if (node) {
      const data: types.traverseTreeNodesData = {
        node,
        index,
        pos,
        key: node.key || pos,
        parentPos: parent.node ? parent.pos : null
      }

      callback(data)
    }

    // 处理children节点
    Children.forEach(childList, (subNode, subIndex) => {
      if (typeof subNode !== 'string' && typeof subNode !== 'number')
        processNode(subNode, subIndex, { node, pos })
    })
  }

  processNode(null, 0, {} as any)
}

export function isCheckDisabled(node: any) {
  const { disabled = undefined, disableCheckbox = undefined } = node.props || {}
  return !!(disabled || disableCheckbox)
}

/**
 * 计算check状态
 * @param keyList       keys列表 list of keys
 * @param isCheck       节点是取消操作还是选择操作
 * @param keyEntities   由`convertTreeToEntities`生成的树
 * @param checkStatus   Can pass current checked status for process (usually for uncheck operation)
 * @returns {{checkedKeys: [], halfCheckedKeys: []}}
 */
export function conductCheck(
  keyList: string[],
  isCheck: boolean,
  keyEntities: types.traverseTreeEntityData,
  checkStatus: types.checkStatus = {}
) {
  // 声明两个临时变量用来标识哪些key已经被选中或半选中
  const checkedKeys: { [key: string]: boolean } = {}
  const halfCheckedKeys: { [key: string]: boolean } = {} // 记录子节点被选中的key(包括子节点半选中)
    // 将已选中或半选中的值记录下来
  ;(checkStatus.checkedKeys || []).forEach((key: any) => {
    checkedKeys[key] = true
  })
  ;(checkStatus.halfCheckedKeys || []).forEach((key: any) => {
    halfCheckedKeys[key] = true
  })

  function conductUp(key: string) {
    if (checkedKeys[key] === isCheck) return
    const entity = keyEntities[key]
    if (!entity) return

    const { children, parent, node } = entity

    if (isCheckDisabled(node)) return

    let everyChildChecked = true
    let someChildChecked = false
    ;(children || [])
      .filter((child: any) => !isCheckDisabled(child.node))
      .forEach(({ key: childKey }: any) => {
        // 查看子元素是否被选中
        const childChecked = checkedKeys[childKey]
        // 查看子元素是否被半选中
        const childHalfChecked = halfCheckedKeys[childKey]
        // 只要有一个子元素被选中或者半选中，当前父元素即处于半选中状态
        if (childChecked || childHalfChecked) someChildChecked = true
        // 如果子元素存在一个未被选中则`everyChildChecked`设为`false`，即属于半选中状态
        if (!childChecked) everyChildChecked = false
      })

    if (isCheck) {
      // 选中状态下执行
      checkedKeys[key] = everyChildChecked
    } else {
      // 取消状态下执行
      checkedKeys[key] = false
    }
    halfCheckedKeys[key] = someChildChecked
    if (parent) {
      conductUp(parent.key)
    }
  }

  function conductDown(key: string) {
    if (checkedKeys[key] === isCheck) return

    const entity = keyEntities[key]
    if (!entity) return

    const { children, node } = entity

    if (isCheckDisabled(node)) return

    checkedKeys[key] = isCheck
    ;(children || []).forEach((child: any) => {
      conductDown(child.key)
    })
  }

  function conduct(key: string) {
    // 判断传入的key是否在列表里
    const entity = keyEntities[key]

    if (!entity) {
      console.warn(`'${key}' does not exist in the tree.`)
      return
    }

    const { children, parent, node } = entity
    // 将传入的key设为已选中
    checkedKeys[key] = isCheck

    if (isCheckDisabled(node))
      return // 读取当前选中元素的子元素，过滤掉不可选节点
    ;(children || [])
      .filter((child: any) => !isCheckDisabled(child.node))
      .forEach((child: any) => {
        // 此函数递归出所有子节点，并将其设为选中状态
        conductDown(child.key)
      })

    if (parent) {
      // 此函数递归出其父节点，并将其设为选中或者半选中状态
      conductUp(parent.key)
    }
  }

  // 遍历外部传入选中的值
  ;(keyList || []).forEach((key: string) => {
    conduct(key)
  })

  const checkedKeyList: string[] = []
  const halfCheckedKeyList: string[] = []

  Object.keys(checkedKeys).forEach(key => {
    if (checkedKeys[key]) {
      checkedKeyList.push(key)
    }
  })

  Object.keys(halfCheckedKeys).forEach(key => {
    if (!checkedKeys[key] && halfCheckedKeys[key]) {
      halfCheckedKeyList.push(key)
    }
  })

  return {
    checkedKeys: checkedKeyList,
    halfCheckedKeys: halfCheckedKeyList
  }
}

/**
 * Since React internal will convert key to string,
 * we need do this to avoid `checkStrictly` use number match
 */
function keyListToString(keyList: any) {
  if (!keyList) return keyList
  return keyList.map((key: any) => String(key))
}
