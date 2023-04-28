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

// UPDATE USER INFO
export const updateUserInfo =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({ type: "updateUserInfoRequest" });

      const { response, error } = await userApi.updateUserInfo({
        name,
        email,
        phoneNumber,
        password,
      });

      dispatch({ type: "updateUserInfoSuccess", payload: response.user });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.message,
      });
    }
  };

// UPDATE USER INFO
export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) =>
  async (dispatch) => {
    try {
      dispatch({ type: "updateUserInfoRequest" });

      const { response, error } = await userApi.updateUserAddress({
        country,
        city,
        address1,
        address2,
        zipCode,
        addressType,
      });

      dispatch({ type: "updateUserInfoSuccess", payload: response.user });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.message,
      });
    }
  };

// DELETE USER INFO
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteUserInfoRequest" });

    const { response, error } = await userApi.deleteUserAddress({ id });

    dispatch({ type: "deleteUserInfoSuccess", payload: response.user });
  } catch (error) {
    dispatch({
      type: "deleteUserInfoFail",
      payload: error.response.message,
    });
  }
};

// UPDATE USER PASSWORD
export const updateUserPassword =
  (oldPassword, newPassword, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: "updateUserPasswordRequest" });

      const { response, error } = await userApi.updateUserPassword({
        oldPassword,
        newPassword,
        confirmPassword,
      });

      dispatch({
        type: "updateUserPasswordSuccess",
        payload: response.message,
      });
    } catch (error) {
      dispatch({
        type: "updateUserPasswordFail",
        payload: error.response.message,
      });
    }
  };
