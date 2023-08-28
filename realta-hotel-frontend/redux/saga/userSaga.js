import { call, put } from "redux-saga/effects";
import ApiMethodUser from "../../api/apiMethod";
import {
  doAddResponse,
  doDeleteResponse,
  doGetUserResponse,
  doUpdateResponse,
} from "../action/actionReducers";

function* handleGetAllUser() {
  try {
    const result = yield call(ApiMethodUser.getAll);
    yield put(doGetUserResponse(result.data));
  } catch (error) {
    yield put(doGetUserResponse({ message: error }));
  }
}

function* handleGetUserPagination(action) {
  try {
    const result = yield call(ApiMethodUser.getPagination, action.payload);
    yield put(doGetUserResponse(result.data));
  } catch (error) {
    yield put(doGetUserResponse({ message: error }));
  }
}

function* handleAddUser(action) {
  try {
    const result = yield call(ApiMethodUser.create, action.payload);
    yield put(doAddResponse(result.data));
  } catch (error) {
    yield put(doAddResponse(error.response.data));
  }
}

function* handleUpdateUser(action) {
  try {
    const result = yield call(ApiMethodUser.update, action.payload);
    yield put(doUpdateResponse(result.data));
  } catch (error) {
    yield put(doUpdateResponse({ message: error }));
  }
}

function* handleDelUser(action) {
  try {
    const result = yield call(ApiMethodUser.remove, action.payload);
    yield put(doDeleteResponse(result.data));
  } catch (error) {
    yield put(doDeleteResponse({ error }));
  }
}

export {
  handleGetAllUser,
  handleAddUser,
  handleUpdateUser,
  handleDelUser,
  handleGetUserPagination,
};
