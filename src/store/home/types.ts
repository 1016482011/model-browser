import { Action } from 'redux'

export enum ActionType {
  UPLOAD_FILE_PROGRESS = '@@HOME/UPLOAD_FILE_PROGRESS',
  UPLOAD_FILE_PROGRESS_RESULT = '@@HOME/UPLOAD_FILE_PROGRESS_RESULT',
  GET_MODEL_LIST = '@@HOME/GET_MODEL_LIST',
  PUT_MODEL_LIST = '@@HOME/PUT_MODEL_LIST',
  SELECT_MODE = '@@HOME/SELECT_MODE',
  DEL_MODEL = '@@HOME/DEL_MODEL',
  DEL_REDUCE_MODEL = '@@HOME/DEL_REDUCE_MODEL',
  MOVE_AND_COPE_MODE = '@@HOME/MOVE_AND_COPE_MODE',
  UPDATE_MODE_NAME = '@@HOME/UPDATE_MODE_NAME'
}

export interface ModelData {
  id: string
  updatetime: string
  name: string
  imgUrl: string
  updated_at: string
  groupName: string
}

export interface SelectModelData {
  id: string
  name: string
  updated_at: string
  model_files: ModelData[]
}

export interface HomeState {
  uploadResult: number
  fileProgress: number
  modeList: ModelData[]
  selectModel: SelectModelData
  modelGroupList: ModelData[]
}

export interface UploadFileProgressAction extends Action {
  type: ActionType.UPLOAD_FILE_PROGRESS
  progress: number
}

export interface UploadFileProgressResultAction extends Action {
  type: ActionType.UPLOAD_FILE_PROGRESS_RESULT
  proResult: number
}

export interface GetModelListAction extends Action {
  type: ActionType.GET_MODEL_LIST
}

export interface PutModelListAction extends Action {
  type: ActionType.PUT_MODEL_LIST
  modelList: ModelData[]
}

export interface SelectModelDataAction extends Action {
  type: ActionType.SELECT_MODE
  modelId: string
}

export interface UpdateModelName extends Action {
  type: ActionType.UPDATE_MODE_NAME
  modelId: string
  name: string
}

export interface DelModel extends Action {
  type: ActionType.DEL_MODEL
  modelId: string
}

export interface DelReduceModel extends Action {
  type: ActionType.DEL_REDUCE_MODEL
  modelId: string
}
export interface MoveAndCopeModel extends Action {
  type: ActionType.MOVE_AND_COPE_MODE
  modelId: string
  modelIds: string
  isCope?: boolean
}

export type HomeAction =
  | UploadFileProgressAction
  | UploadFileProgressResultAction
  | GetModelListAction
  | PutModelListAction
  | DelModel
  | MoveAndCopeModel
  | DelReduceModel
  | SelectModelDataAction
  | UpdateModelName
