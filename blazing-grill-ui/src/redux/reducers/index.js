import { combineReducers } from "redux";
import viewItemReducer from "./viewItemReducer";

const rootReducer = combineReducers({
  viewItem: viewItemReducer,
});

export default rootReducer;
