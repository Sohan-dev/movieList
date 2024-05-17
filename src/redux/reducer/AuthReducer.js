import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  status: '',
  token: null,
  email: null,
  error: null,
  isLoading: true,
  _loginRequest: {},
  movieList: [],
  logOutRes: null,
  loading: false,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState: initialState,
  reducers: {
    tokenRequest(state, action) {
      state.auth_status = action.type;
      state.isLoading = true;
    },
    tokenSuccess(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.token = action?.payload?.token ?? null;
    },
    tokenFailure(state, action) {
      state.auth_status = action.type;
      state.isLoading = false;
      state.error = action.payload;
    },

    getMovieListRequest(state, action) {
      state.auth_status = action.type;
      state.loading = true;
    },
    getMovieListSuccess(state, action) {
      state.auth_status = action.type;
      state.movieList = action.payload;
      state.loading = false;
    },
    getMovieListFailure(state, action) {
      state.auth_status = action.type;
      state.error = action.payload;
      state.loading = false;
    },

    loginRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.status = action.type;
      state._loginRequest = action.payload;
      state.loading = false;
    },
    loginFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.loading = false;
    },

    logOutRequest(state, action) {
      state.status = action.type;
      state.loading = true;
    },
    logOutSuccess(state, action) {
      state.status = action.type;
      state.logOutRes = 'Logout';
      state.loading = false;
    },
    logOutFailure(state, action) {
      state.status = action.type;
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  tokenRequest,
  tokenSuccess,
  tokenFailure,

  getOTPRequest,
  getOTPSuccess,
  getOTPFailure,

  addVehicleRequest,
  addVehicleSuccess,
  addVehicleFailure,

  logOutRequest,
  logOutSuccess,
  logOutFailure,

  loginRequest,
  loginSuccess,
  loginFailure,

  getMovieListRequest,
  getMovieListSuccess,
  getMovieListFailure,
} = AuthSlice.actions;
export default AuthSlice.reducer;
