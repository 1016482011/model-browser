import { ActionCreator } from 'redux'
import {
  ModelData,
  GetModelListAction,
  PutModelListAction,
  UploadFileProgressAction,
  UploadFileProgressResultAction,
  SelectModelDataAction,
  ActionType,
  DelModel,
  DelReduceModel,
  MoveAndCopeModel,
  UpdateModelName
} from './types'
/**saga action */
export const getModelList: ActionCreator<GetModelListAction> = (
  modelId?: string
) => ({
  type: ActionType.GET_MODEL_LIST,
  modelId
})
export const delModel: ActionCreator<DelModel> = (modelId: string) => ({
  type: ActionType.DEL_MODEL,
  modelId
})

export const selectModeById: ActionCreator<SelectModelDataAction> = (
  modelId: string
) => ({
  type: ActionType.SELECT_MODE,
  modelId
})

export const updateModelName: ActionCreator<UpdateModelName> = (
  modelId: string,
  name: string
) => ({
  type: ActionType.UPDATE_MODE_NAME,
  modelId,
  name
})
export const moveAndCopeModel: ActionCreator<MoveAndCopeModel> = (
  modelId: string,
  modelIds: string,
  isCope?: boolean
) => ({
  type: ActionType.MOVE_AND_COPE_MODE,
  modelId,
  modelIds,
  isCope
})

/**action */
export const putModelList: ActionCreator<PutModelListAction> = (
  modelList: ModelData[]
) => ({
  type: ActionType.PUT_MODEL_LIST,
  modelList
})

export const uploadFileProgress: ActionCreator<UploadFileProgressAction> = (
  progress: number
) => ({
  type: ActionType.UPLOAD_FILE_PROGRESS,
  progress
})

export const uploadFileProgressResult: ActionCreator<
  UploadFileProgressResultAction
> = (proResult: number) => ({
  type: ActionType.UPLOAD_FILE_PROGRESS_RESULT,
  proResult
})

export const delReduceModelList: ActionCreator<DelReduceModel> = (
  modelId: string
) => ({
  type: ActionType.DEL_REDUCE_MODEL,
  modelId
})
