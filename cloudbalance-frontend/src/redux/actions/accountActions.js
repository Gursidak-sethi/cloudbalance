export const SET_SELECTED_ACCOUNT = "SET_SELECTED_ACCOUNT";

export const setAccount = (accountId) => ({
  type: SET_SELECTED_ACCOUNT,
  payload: accountId,
});
