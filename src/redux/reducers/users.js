const userState = {
  user_id: null,
};
export const userReducer = (state = userState, action) => {
  var newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "UPDATE_USER": {
      newState = action.user;
      break;
    }
    case "ADD_USER": {
      newState = action.user;
      break;
    }
    case "LOGOUT": {
      newState = {};
      break;
    }
    default:
      return newState;
  }
  return newState;
};
