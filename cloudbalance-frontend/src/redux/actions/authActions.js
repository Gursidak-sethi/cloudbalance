export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOGOUT = "LOGOUT";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});
