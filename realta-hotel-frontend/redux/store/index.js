import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducers from "../reducer/userReducer";
import { productReducers } from "../reducer/productReducers";
import authReducers from "../reducer/authReducers";
import { combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import * as rootSaga from "../saga";
import { createLogger } from "redux-logger";

const logger = createLogger();
const saga = createSagaMiddleware();
const reducer = combineReducers({
  userReducers,
  productReducers,
  authReducers,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(logger)
      .concat(saga),
});

saga.run(rootSaga);

export default store;
