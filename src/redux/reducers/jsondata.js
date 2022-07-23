const jsondataState = [];
export const jsondataReducer = (state = jsondataState, action) => {
  var newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "UPDATE_jsondata": {
      newState = action.jsondata;
      break;
    }
    case "ADD_jsondata": {
      newState = action.jsondata;
      break;
    }
    case "DELETE_jsondata": {
      newState = [];
      break;
    }
    default:
      return newState;
  }
  return newState;
};
