import { take, put, select, call } from 'redux-saga/effects'
import { message } from 'antd'
import * as apis from '../../helper/api'
import * as action from './action'
import { ActionType } from './types'

function* selectModel(modelId: string) {
  if (modelId != '' && modelId != null) {
    yield put(action.selectModeById(modelId))
  }
}

function* putModeList() {
  const result = yield apis.getModelList()
  yield put(action.putModelList(result.data))
}

export function* loadHomeData() {
  while (true) {
    const { modelId } = yield take(ActionType.GET_MODEL_LIST)
    yield call(putModeList)
    yield call(selectModel, modelId)
  }
}

export function* delModel() {
  while (true) {
    const { modelId } = yield take(ActionType.DEL_MODEL)
    const result = yield apis.deleteModel(modelId)
    //删除成功后,将reducer中数据也删除
    yield put(action.delReduceModelList(modelId))
    //重新获取数据
    yield call(putModeList)
    message.success('删除成功')
  }
}

export function* moveAndCopeMode() {
  while (true) {
    const { modelId, modelIds, isCope } = yield take(
      ActionType.MOVE_AND_COPE_MODE
    )
    const result = yield apis.moveMode(modelId, modelIds, isCope)
    yield put(action.getModelList())
    message.success('操作成功')
  }
}
export function* updateModeName() {
  while (true) {
    const { modelId, name } = yield take(ActionType.UPDATE_MODE_NAME)
    const result = yield apis.updateModelName(modelId, name)
    yield call(putModeList)
    yield call(selectModel, modelId)
    message.success('更新成功')
  }
}
