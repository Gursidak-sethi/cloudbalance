import {
  SET_SELECTED_AWS_ACCOUNT,
  SET_SELECTED_CA_ACCOUNT,
} from "../actions/accountActions";

const initialState = {
  selectedAwsAccountId: null,
  selectedCaAccountId: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_AWS_ACCOUNT:
      return {
        ...state,
        selectedAwsAccountId: action.payload,
      };

    case SET_SELECTED_CA_ACCOUNT:
      return {
        ...state,
        selectedCaAccountId: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
