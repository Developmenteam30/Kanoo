const cartState = [];
export const cartReducer = (state = cartState, action) => {
  var newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "UPDATE_CART": {
      newState = action.cart;
      break;
    }
    case "ADD_CART": {
      newState = action.cart;
      break;
    }
    case "DELETE_CART": {
      newState = [];
      break;
    }
    default:
      return newState;
  }
  return newState;
};
