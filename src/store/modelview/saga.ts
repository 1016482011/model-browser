import { take, put, select } from 'redux-saga/effects'
import * as action from './action'
import { ActionType } from './types'

export function* modelViewInit() {
  while (true) {
    yield take(ActionType.GET_MODELTREE)
    const {
      modelview: { modelLoader }
    } = yield select()
    const result = yield modelLoader.getModelTree()
    yield put(action.setModelTree(result.data))
  }
}
