import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import onboardingReducer from "./reducers/onboardReducer";
import accountReducer from "./reducers/accountReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  onboard: onboardingReducer,
  account: accountReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
