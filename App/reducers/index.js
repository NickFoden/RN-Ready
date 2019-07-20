import { combineReducers } from "redux";

import currencies from "./currencies";
import network from "./network";
import theme from "./theme";

export default combineReducers({
  currencies,
  network,
  theme
});
