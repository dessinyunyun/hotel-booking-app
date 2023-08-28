import ActionTypes from "../action/actionType";

const initialState = {
  token: null,
  username: "",
  refresh: "",
  message: "",
  isAuthenticated: false,
};

export default function userReducers(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  console.log(state);
  switch (type) {
    case ActionTypes.GET_LOGIN_RESPONSE:
      return {
        state,
        token: payload.accesToken,
        username: payload.username,
        refresh: true,
        message: payload.message,
        isAuthenticated: true,
      };
    case ActionTypes.CHECK_AUTH_RESPONSE:
      return {
        isAuthenticated: payload.data,
      };
    default:
      return state;
  }
}
