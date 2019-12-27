import { fork } from 'redux-saga/effects'
import { modelViewInit } from './modelview/saga'
import {
  loadHomeData,
  delModel,
  moveAndCopeMode,
  updateModeName
} from './home/saga'
export default function* root() {
  // home
  yield fork(loadHomeData)
  yield fork(delModel)
  yield fork(moveAndCopeMode)
  yield fork(updateModeName)
  // modelview
  yield fork(modelViewInit)
}
