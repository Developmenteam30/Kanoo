import { combineReducers } from "redux";
import { userReducer } from "./users";
import { cartReducer } from "./cart";
import { categoryReducer } from "./category";
import { productReducer } from "./products";
import { jsondataReducer } from "./jsondata";
export const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  categoryReducer,
  productReducer,
  jsondataReducer
});
