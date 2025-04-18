import { createStore, combineReducers } from "redux";
import authReducer from "./authReducer";
import onboardingReducer from "./onboardReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  onboard: onboardingReducer,
});

export const store = createStore(rootReducer);
