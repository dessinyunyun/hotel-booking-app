import { takeEvery, all } from "redux-saga/effects";
import ActionTypes from "../action/actionType";
import {
  handleAddUser,
  handleDelUser,
  handleGetAllUser,
  handleUpdateUser,
  handleGetUserPagination,
} from "./userSaga";

import {
  handleAddProduct,
  handleDelProduct,
  handleGetProduct,
  handleUpdateProduct,
} from "./productSaga";

import { handleLogin, checkAuth, CH } from "./authSaga";

function* watchAll() {
  yield all([
    takeEvery(ActionTypes.REQ_GET_USERS, handleGetAllUser),
    takeEvery(ActionTypes.REQ_GET_USERS_PAGINATION, handleGetUserPagination),

    takeEvery(ActionTypes.ADD_USER, handleAddUser),
    takeEvery(ActionTypes.UPDATE_USER, handleUpdateUser),
    takeEvery(ActionTypes.DEL_USER, handleDelUser),

    takeEvery(ActionTypes.REQ_GET_PRODUCTS, handleGetProduct),
    takeEvery(ActionTypes.ADD_PRODUCT, handleAddProduct),
    takeEvery(ActionTypes.UPDATE_PRODUCT, handleUpdateProduct),
    takeEvery(ActionTypes.DEL_PRODUCT, handleDelProduct),

    takeEvery(ActionTypes.REQ_GET_LOGIN, handleLogin),
    takeEvery(ActionTypes.CHECK_AUTH, checkAuth),
  ]);
}

export default watchAll;
