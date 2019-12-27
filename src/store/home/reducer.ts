import { Reducer } from 'redux'
import _ from 'lodash'
import { HomeState, HomeAction, ActionType, ModelData } from './types'

const initialState: HomeState = {
  uploadResult: 0,
  fileProgress: 0,
  modeList: [],
  selectModel: { id: '', name: '', model_files: [], updated_at: '' },
  modelGroupList: []
}

const reducer: Reducer<HomeState> = (
  state: HomeState = initialState,
  action
) => {
  switch ((action as HomeAction).type) {
    case ActionType.UPLOAD_FILE_PROGRESS:
      return _.assign({}, state, { fileProgress: action.progress })
    case ActionType.UPLOAD_FILE_PROGRESS_RESULT:
      return _.assign({}, state, { uploadResult: action.proResult })
    case ActionType.PUT_MODEL_LIST:
      return _.assign({}, state, {
        modeList: action.modelList,
        modelGroupList: _.filter(action.modelList, node => node)
      })
    case ActionType.DEL_REDUCE_MODEL:
      return _.assign({}, state, {
        uploadResult: _.remove(state.modeList, node => {
          return node.id == action.modelId
        })
      })
    case ActionType.SELECT_MODE:
      console.log(
        _.assign({}, state, {
          selectModel: _.find(state.modeList, node => node.id == action.modelId)
        })
      )
      return _.assign({}, state, {
        selectModel: _.find(state.modeList, node => node.id == action.modelId)
      })
    default:
      return state
  }
}
export default reducer
