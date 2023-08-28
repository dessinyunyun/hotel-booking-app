import { call, put } from "redux-saga/effects";
import ApiMethodAuth from "../../api/AuthApiMethod";

import { doCheckAuthResponse, doGetLoginResponse } from "../action/actionAuth";

function* handleLogin(action) {
  try {
    const result = yield call(ApiMethodAuth.Login, action.payload);
    const { accesToken } = result.data;

    if (result) {
      localStorage.setItem("token", accesToken);
      yield put(doGetLoginResponse(result.data));
    } else {
      yield put(doGetLoginResponse({ message: "Token is empty" }));
    }
  } catch (error) {
    console.log(error);
    yield put(doGetLoginResponse(error.response.data));
  }
}

function* checkAuth() {
  try {
    const result = yield call(ApiMethodAuth.checkAuth);
    console.log(result);
    yield put(doCheckAuthResponse(result));
  } catch (error) {
    yield put(doCheckAuthResponse(error));
  }
}

export { handleLogin, checkAuth };
