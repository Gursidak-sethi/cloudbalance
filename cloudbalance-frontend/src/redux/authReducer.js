import { SET_CURRENT_USER, LOGOUT } from "./actions";

const initialState = {
  token: null,
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { currentUser: action.payload };
    case LOGOUT:
      return { token: null, currentUser: null };
    default:
      return state;
  }
};

export default authReducer;
