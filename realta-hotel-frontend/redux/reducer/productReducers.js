import ActionTypes from "../action/actionType";

const initialState = {
  products: [],
  message: "",
  refresh: "",
  error: "",
};

export function productReducers(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case ActionTypes.GET_PRODUCTS_RESPONSE:
      return {
        state,
        products: payload.data,
        refresh: true,
        message: payload.message,
        error: payload.error ? payload.error : "",
      };
    case ActionTypes.ADD_PRODUCT_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.UPDATE_PRODUCT_RESPONSE:
      return { message: payload.message, refresh: false };
    case ActionTypes.DEL_PRODUCT_RESPONSE:
      return {
        state,
        products: state.products.filter((product) => product.id !== payload.id),
      };
    default:
      return state;
  }
}
