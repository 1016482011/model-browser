import { Children } from 'react'

export interface treeProps {
  children: React.ReactNode[]
  [key: string]: any
}

export interface treeState {
  treeNode: treeNode
  expandedKeys: string[]
  newState: newState | null
  checkedKeys: string[]
  halfCheckedKeys: string[]
  keyEntities: traverseTreeEntityData
  selectedKeys: string[]
  prevProps?: treeProps
}

export type treeNode = React.ReactChild[] | null

export interface newState {
  prevProps: treeProps
  treeNode?: treeNode
  posEntities?: any
  keyEntities?: any
  expandedKeys?: string[]
  selectedKeys?: string[]
  checkedKeys?: string[]
  halfCheckedKeys?: string[]
  [key: string]: any
}

export interface traverseTreeData {
  node: React.ReactElement<any>
  index: number
  pos: string
  key: React.ReactText
}

export interface traverseTreeEntityData extends traverseTreeData {
  node: React.ReactElement<any>
  index: number
  pos: string
  key: React.ReactText
  parent?: any
  [key: string]: any
}

export interface traverseTreeNodesData extends traverseTreeData {
  parentPos: string | null
}

export interface treeToEntities extends traverseTreeData {
  children?: treeToEntities
}

export interface checkStatus {
  [key: string]: string[]
}
