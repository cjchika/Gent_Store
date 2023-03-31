import userApi from "../../config/services/userAuth.api";

export const getUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetUserRequest",
    });
    const { response, error } = await userApi.getUser();
    dispatch({
      type: "GetUserResponse",
      payload: response.user,
    });
  } catch (error) {
    dispatch({
      type: "GetUserError",
      payload: error.message,
    });
  }
};
