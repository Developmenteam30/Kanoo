const productState = {
};
export const productReducer = (state = productState, action) => {
  var newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "UPDATE_product": {
      newState = action.product;
      break;
    }
    case "ADD_product": {
      newState = action.product;
      break;
    }
    default:
      return newState;
  }
  return newState;
};
