import ActionTypes from "./actionType";

export const doRequestGetLogin = (payload) => {
  return {
    type: ActionTypes.REQ_GET_LOGIN,
    payload,
  };
};

export const doGetLoginResponse = (payload) => {
  return {
    type: ActionTypes.GET_LOGIN_RESPONSE,
    payload,
  };
};

export const doCheckAuth = () => {
  return {
    type: ActionTypes.CHECK_AUTH,
  };
};

export const doCheckAuthResponse = (payload) => {
  return {
    type: ActionTypes.CHECK_AUTH_RESPONSE,
    payload,
  };
};
