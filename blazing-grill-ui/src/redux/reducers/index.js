import { combineReducers } from "redux";
import viewItemReducer from "./viewItemReducer";
import appReducer from "./AppReducer";

const rootReducer = combineReducers({
  viewItem: viewItemReducer,
  appReducer: appReducer,
});

export default rootReducer;
