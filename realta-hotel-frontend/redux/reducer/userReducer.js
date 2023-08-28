import ActionTypes from "../action/actionType";

const initialState = {
  users: [],
  message: "",
  refresh: "",
  userPagination: [],
  totalPagination: 0,
  status: 0,
};

export default function userReducers(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case ActionTypes.GET_USERS_RESPONSE:
      return {
        state,
        users: payload.data,
        refresh: true,
        message: payload.message,
        userPagination: payload.userPagination,
        totalPagination: payload.totalPagination,
      };
    case ActionTypes.ADD_USER_RESPONSE:
      return {
        message: payload.message,
        refresh: false,
        status: payload.status,
      };
    case ActionTypes.UPDATE_USER_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_USER_RESPONSE:
      return {
        state,
        users: state.users.filter((user) => user.id !== payload.id),
      };
    default:
      return state;
  }
}
