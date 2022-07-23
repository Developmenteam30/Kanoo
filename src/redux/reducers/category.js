const categoryState = [];
export const categoryReducer = (state = categoryState, action) => {
  var newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "UPDATE_CATEGORY": {
      newState = action.category;
      break;
    }
    case "ADD_category": {
      newState = action.category;
      break;
    }
    case "DELETE_category": {
      newState = [];
      break;
    }
    default:
      return newState;
  }
  return newState;
};
