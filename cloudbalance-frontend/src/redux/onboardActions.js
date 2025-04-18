export const UPDATE_FIELD = "UPDATE_FIELD";
export const RESET_FORM = "RESET_FORM";

export const updateField = (name, value) => ({
  type: UPDATE_FIELD,
  payload: { name, value },
});

export const resetForm = () => ({
  type: RESET_FORM,
});
