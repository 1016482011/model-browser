import { combineReducers, Reducer } from 'redux'
import { HomeState } from './home/types'
import { ModelViewState } from './modelview/types'
import home from './home/reducer'
import modelview from './modelview/reducer'

export interface ApplicationState {
  home: HomeState
  modelview: ModelViewState
}

const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
  home,
  modelview
})

export default reducers
