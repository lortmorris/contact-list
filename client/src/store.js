import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducers from './reducers';
import sagas from './sagas';

const reducersCombined = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducersCombined,
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(sagas);


export default store;
