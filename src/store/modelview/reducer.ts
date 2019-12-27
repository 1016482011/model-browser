import { Reducer } from 'redux'
import _ from 'lodash'
import { ModelViewAction, ModelViewState, ActionType } from './types'

const initialState: ModelViewState = {
  modelTool: null,
  treeData: [],
  sideActive: null,
  bustardLoader: null,
  modelLoader: null
}

const reducer: Reducer<ModelViewState> = (
  state: ModelViewState = initialState,
  action
) => {
  switch ((action as ModelViewAction).type) {
    case ActionType.SET_MODELTOOL:
      return _.assign({}, state, action.modelTool)
    case ActionType.SET_MODELTREE:
      return _.assign({}, state, { treeData: action.treeData })
    case ActionType.SET_SIDEACTIVE:
      return _.assign({}, state, { sideActive: action.active })
    default:
      return state
  }
}
export default reducer
