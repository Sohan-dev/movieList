import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import RootSaga from '../../saga/RootSaga';
import AuthReducer from '../reducer/AuthReducer';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

export default configureStore({
  reducer: {
    AuthReducer: AuthReducer,
  },
  middleware,
});

sagaMiddleware.run(RootSaga);
