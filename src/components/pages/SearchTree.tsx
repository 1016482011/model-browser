import React from 'react'
import { Tree, Input } from 'antd'
import { connect } from 'react-redux'
import _ from 'lodash'
import { IconEnum, FontIcon } from '../index'
import { ApplicationState } from '../../store/rootReducer'
import { ModelViewState } from '../../store/modelview/types'

const { TreeNode } = Tree

interface TreeProps {
  onCheck: (checkedKeys: string[]) => void
}

type Props = TreeProps & ModelViewState

interface State {
  isSearch: boolean
  searchValue: string
  expandedKeys: string[]
  autoExpandParent: boolean
}

// TODO 补全类型声明
class SearchTreeContanier extends React.Component<Props, State> {
  state: State = {
    isSearch: true,
    searchValue: '',
    expandedKeys: [],
    autoExpandParent: true
  }

  public dataList: any[] = []

  componentDidUpdate(preProps: any) {
    // 当props中树的数据发生变化时重新生成树列表
    if (preProps.treeData !== this.props.treeData) {
      this.dataList = []
      this.generateList(this.props.treeData)
    }
  }

  // 将树形结构数据展平
  generateList = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      this.dataList.push({ code: node.code, value: node.value })
      if (node.children) {
        this.generateList(node.children)
      }
    }
  }

  // 获取树的父级节点
  getParentKey = (key: any, tree: any) => {
    let parentKey: any
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (
          node.children.some((item: any) => {
            return item.code === key
          })
        ) {
          parentKey = node.code
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }

  // 输入框事件触发
  onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { treeData } = this.props
    const searchValue = e.target.value

    const expandedKeys = _.isEmpty(searchValue)
      ? []
      : this.dataList
          .map((item: any) => {
            if (item.value.indexOf(searchValue) > -1) {
              return this.getParentKey(item.code, treeData)
            }
            return null
          })
          .filter(
            (item: any, i: any, self: any) => item && self.indexOf(item) === i
          )
    this.setState({
      expandedKeys,
      searchValue: searchValue,
      autoExpandParent: true
    })
  }

  // 展开事件
  onExpand = (expandedKeys: string[]) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false
    })
  }

  // 勾选事件
  onCheck = (
    checkedKeys:
      | string[]
      | {
          checked: string[]
          halfChecked: string[]
        }
  ) => {
    if (!_.isArray(checkedKeys)) return
    this.props.onCheck(checkedKeys)
  }

  // 树渲染
  treeRender() {
    const { expandedKeys, autoExpandParent, searchValue } = this.state
    const { treeData } = this.props
    const loop = (data: any) => {
      return data.map((item: any) => {
        const index = item.value.indexOf(searchValue)
        const beforeStr = item.value.substr(0, index)
        const afterStr = item.value.substr(index + searchValue.length)
        const title =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.value}</span>
          )
        if (item.children && item.children.length > 0) {
          return (
            <TreeNode
              key={item.code}
              icon={<FontIcon color="#0DA0DE" name={IconEnum.folder} />}
              title={title}
            >
              {loop(item.children)}
            </TreeNode>
          )
        }
        return (
          <TreeNode
            key={item.code}
            icon={<FontIcon color="#0DA0DE" name={IconEnum.folder} />}
            title={title}
          />
        )
      })
    }
    return (
      <Tree
        onExpand={this.onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={this.onCheck}
        showLine
        checkable
        showIcon
      >
        {loop(treeData)}
      </Tree>
    )
  }

  // 右侧树展示栏
  treeHeaderRender() {
    const { isSearch, searchValue } = this.state
    const Headerleft = () => {
      return isSearch ? (
        <div className="l-flex__item--full ">
          <div className="p-modeltree__input">
            <Input.Search
              placeholder="请输入关键字查询"
              value={searchValue}
              onChange={this.onSearch}
            />
          </div>
        </div>
      ) : (
        <div className="l-flex__item--full ">
          <div className="p-modeltree__titlebox">
            <FontIcon name={IconEnum.list} />
            <span className="p-modeltree__title">模型树</span>
          </div>
          <div className="p-modeltree__line" />
        </div>
      )
    }

    const HeaderRightIcon = () => {
      if (isSearch)
        return <FontIcon name={IconEnum.closeCircle} color="#ccc" size={20} />
      return <FontIcon name={IconEnum.search} color="#169CEE" size={20} />
    }

    return (
      <div className="p-modeltree__header">
        <div className="l-flex">
          {Headerleft()}
          <div className="l-flex__item">
            <div className="p-modeltree__search">
              <div
                className="p-modeltree__searchIcon"
                onClick={() =>
                  this.setState({
                    isSearch: !isSearch,
                    searchValue: '',
                    expandedKeys: []
                  })
                }
              >
                {HeaderRightIcon()}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="p-modeltree">
        {this.treeHeaderRender()}
        <hr className="hr hr--dark" />
        <div className="p-modeltree__body">
          <div className="p-modeltree__body--bg">{this.treeRender()}</div>
        </div>
      </div>
    )
  }
}
const SearchTree = connect((state: ApplicationState) => state.modelview)(
  SearchTreeContanier
)
export { SearchTree }
