import ActionTypes from "./actionType";

export const doRequestGetProduct = () => {
  return {
    type: ActionTypes.REQ_GET_PRODUCTS,
  };
};

export const doGetProductResponse = (payload) => {
  return {
    type: ActionTypes.GET_PRODUCTS_RESPONSE,
    payload,
  };
};

export const doAdd = (payload) => {
  return {
    type: ActionTypes.ADD_PRODUCT,
    payload,
  };
};

export const doAddResponse = (payload) => {
  return {
    type: ActionTypes.ADD_PRODUCT_RESPONSE,
    payload,
  };
};

export const doUpdate = (payload) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT,
    payload,
  };
};

export const doUpdateResponse = (payload) => {
  return {
    type: ActionTypes.UPDATE_PRODUCT_RESPONSE,
    payload,
  };
};

export const doDelete = (payload) => {
  return {
    type: ActionTypes.DEL_PRODUCT,
    payload,
  };
};

export const doDeleteResponse = (payload) => {
  return {
    type: ActionTypes.DEL_PRODUCT_RESPONSE,
    payload,
  };
};
