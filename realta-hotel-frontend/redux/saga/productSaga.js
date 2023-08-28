import { call, put } from "redux-saga/effects";
import ApiMethodProduct from "../../api/productApiMethod";

import {
  doAddResponse,
  doGetProductResponse,
  doUpdateResponse,
  doDeleteResponse,
} from "../action/actionProduct";

function* handleGetProduct() {
  try {
    const result = yield call(ApiMethodProduct.getAll);
    yield put(doGetProductResponse(result.data));
  } catch (error) {
    console.log(error);
    yield put(doGetProductResponse(error.response.data));
  }
}

function* handleAddProduct(action) {
  try {
    const formData = new FormData();
    formData.append("name", action.payload.name);
    formData.append("price", action.payload.price);
    formData.append("description", action.payload.description);
    formData.append("category_id", action.payload.category_id);
    formData.append("file", action.payload.file[0]); // file gambar

    const result = yield call(ApiMethodProduct.create, formData);
    yield put(doAddResponse(result.data));
  } catch (error) {
    yield put(doAddResponse({ message: error }));
  }
}

function* handleUpdateProduct(action) {
  try {
    const result = yield call(ApiMethodProduct.update, action.payload);
    yield put(doUpdateResponse(result.data));
  } catch (error) {
    yield put(doUpdateResponse({ message: error }));
  }
}

function* handleDelProduct(action) {
  try {
    const result = yield call(ApiMethodProduct.remove, action.payload);

    yield put(doDeleteResponse(result.data));
  } catch (error) {
    yield put(doDeleteResponse({ error }));
  }
}

export {
  handleGetProduct,
  handleAddProduct,
  handleUpdateProduct,
  handleDelProduct,
};
