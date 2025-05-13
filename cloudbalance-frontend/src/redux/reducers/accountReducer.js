import { SET_SELECTED_ACCOUNT } from "../actions/accountActions";

const initialState = {
  selectedAccountId: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_ACCOUNT:
      return {
        ...state,
        selectedAccountId: action.payload,
      };

    default:
      return state;
  }
};

export default accountReducer;
