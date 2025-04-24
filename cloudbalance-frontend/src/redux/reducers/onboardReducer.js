import { RESET_FORM, UPDATE_FIELD } from "../actions/onboardActions";

const initialState = {
  accountId: "",
  accountName: "",
  arn: "",
};

const onboardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
};

export default onboardingReducer;
