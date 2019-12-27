import { Action } from 'redux'
import { Bustard } from 'bustard'
import { Loader, TreeLoader } from 'bustard/lib/tools'

/**类型定义 */

export enum ActionType {
  SET_MODELTOOL = '@@MV/SET_MODELTOOL',
  SET_MODELTREE = '@@MV/SET_MODELTREE',
  GET_MODELTREE = '@@MV/GET_MODELTREE',
  SET_SIDEACTIVE = '@@MV/SET_SIDEACTIVE'
}

/**state 定义 */

export type TreeDataState = any

export interface ModelViewState {
  modelTool: Bustard | null
  treeData: TreeDataState[]
  sideActive: string | null
  bustardLoader: Loader | null
  modelLoader: TreeLoader | null
}

/**saga 定义 */

export interface modelViewInitAction extends Action {
  type: ActionType.GET_MODELTREE
}

/**action 定义 */

export interface SetModelToolAction extends Action {
  type: ActionType.SET_MODELTOOL
  modelTool: {
    modelTool: Bustard
    bustardLoader: Loader
    modelLoader: TreeLoader
  }
}

export interface SetModelTreeAction extends Action {
  type: ActionType.SET_MODELTREE
  treeData: TreeDataState[]
}

export interface SetSideActiveAction extends Action {
  type: ActionType.SET_SIDEACTIVE
  active: string
}

export type ModelViewAction =
  | SetModelToolAction
  | SetModelTreeAction
  | modelViewInitAction
  | SetSideActiveAction
