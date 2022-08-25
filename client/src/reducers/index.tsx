import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { tableReducer } from "./tableReducer";

export default combineReducers({
  auth: authReducer,
  tables: tableReducer,
});
