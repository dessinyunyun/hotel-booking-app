import ActionTypes from "./actionType";

export const doRequestGetUser = () => {
  return {
    type: ActionTypes.REQ_GET_USERS,
  };
};

export const doRequestGetUserPagination = (payload) => {
  return {
    type: ActionTypes.REQ_GET_USERS_PAGINATION,
    payload,
  };
};

export const doGetUserResponse = (payload) => {
  return {
    type: ActionTypes.GET_USERS_RESPONSE,
    payload,
  };
};

export const doAdd = (payload) => {
  return {
    type: ActionTypes.ADD_USER,
    payload,
  };
};

export const doAddResponse = (payload) => {
  return {
    type: ActionTypes.ADD_USER_RESPONSE,
    payload,
  };
};

export const doUpdate = (payload) => {
  return {
    type: ActionTypes.UPDATE_USER,
    payload,
  };
};

export const doUpdateResponse = (payload) => {
  return {
    type: ActionTypes.UPDATE_USER_RESPONSE,
    payload,
  };
};

export const doDelete = (payload) => {
  return {
    type: ActionTypes.DEL_USER,
    payload,
  };
};

export const doDeleteResponse = (payload) => {
  return {
    type: ActionTypes.DEL_USER_RESPONSE,
    payload,
  };
};
