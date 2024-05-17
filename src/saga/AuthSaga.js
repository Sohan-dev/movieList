import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, takeLatest} from 'redux-saga/effects';
import {
  getMovieListFailure,
  getMovieListSuccess,
  logOutFailure,
  logOutSuccess,
  loginFailure,
  loginSuccess,
  tokenFailure,
  tokenSuccess,
} from '../redux/reducer/AuthReducer';
import {getApi} from '../utils/helpers/ApiRequest';
import constants from '../utils/helpers/constants';
import Toast from '../utils/helpers/Toast';

export function* tokenSaga() {
  try {
    let creds = yield call(AsyncStorage.getItem, constants.TOKEN);

    if (creds != null) {
      yield put(tokenSuccess(JSON.parse(creds)));
    } else {
      yield put(tokenSuccess(null));
    }
  } catch (error) {
    console.log(error);
    yield put(tokenFailure(error));
  }
}

export function* loginSaga(action) {
  try {
    yield call(
      AsyncStorage.setItem,
      constants.TOKEN,
      JSON.stringify({
        token: 'CV6yQ931p6myyniTdoKX',
      }),
    );
    yield put(loginSuccess(action.payload));
    yield put(
      tokenSuccess({
        token: 'CV6yQ931p6myyniTdoKX',
      }),
    );
  } catch (error) {
    console.log('Catch', error);
    yield put(loginFailure(error));
    Toast(error.message);
  }
}

export function* logoutSaga() {
  try {
    // let response = yield call(postApi, 'logout', {}, header);

    yield call(AsyncStorage.clear);

    yield put(tokenSuccess(null));

    yield put(logOutSuccess('logout'));
    Toast('Logged out successfully');
  } catch (error) {
    yield put(logOutFailure(error?.response ? error?.response : error));
  }
}

export function* getMovieList() {
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(getApi, 'movies', header);
    yield put(getMovieListSuccess(response.data));
  } catch (error) {
    yield put(getMovieListFailure(error));
    console.log(error?.response);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Auth/tokenRequest', tokenSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/loginRequest', loginSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/getMovieListRequest', getMovieList);
  })(),

  (function* () {
    yield takeLatest('Auth/logOutRequest', logoutSaga);
  })(),
];

export default watchFunction;
