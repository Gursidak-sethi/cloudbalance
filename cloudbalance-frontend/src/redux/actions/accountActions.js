export const SET_SELECTED_AWS_ACCOUNT = "SET_SELECTED_AWS_ACCOUNT";
export const SET_SELECTED_CA_ACCOUNT = "SET_SELECTED_CA_ACCOUNT";

export const setAwsAccount = (accountId) => ({
  type: SET_SELECTED_AWS_ACCOUNT,
  payload: accountId,
});
export const setCaAccount = (accountId) => ({
  type: SET_SELECTED_CA_ACCOUNT,
  payload: accountId,
});
