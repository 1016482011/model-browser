import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import mySaga from './rootSaga'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  {},
  compose(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(mySaga)
export default store
