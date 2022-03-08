import { combineReducers } from "redux";
import { filterStateReducer } from "./resourceFilterReducer";
import { authStateReducer } from "./authReducer";

const rootReducer = combineReducers({
  filterStateReducer: filterStateReducer,
  authStateReducer: authStateReducer,
});

export default rootReducer;
