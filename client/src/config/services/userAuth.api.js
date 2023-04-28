import privateClient from "../client/UserClient/private.client";
import publicClient from "../client/UserClient/public.client";

const userEndpoints = {
  activateUser: ({ activationCode }) => `user/activation/${activationCode}`,
  loginUser: "user/loginUser",
  getUser: "user/getUser",
  updateUserInfo: "user/updateUserInfo",
  updateUserAddress: "user/updateUserAddress",
  deleteUserAddress: ({ id }) => `user/deleteUserAddress/${id}`,
  updateUserPassword: "user/updateUserPassword",
};

const userApi = {
  activateUser: async ({ activationCode }) => {
    try {
      const response = await publicClient.get(
        userEndpoints.activateUser({ activationCode })
      );
      localStorage.setItem("tok", response.token);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  loginUser: async ({ email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.loginUser, {
        email,
        password,
      });
      localStorage.setItem("tok", response.token);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getUser: async () => {
    try {
      const response = await privateClient.get(userEndpoints.getUser);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateUserInfo: async ({ name, email, phoneNumber, password }) => {
    try {
      const response = await privateClient.put(userEndpoints.updateUserInfo, {
        name,
        email,
        phoneNumber,
        password,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateUserAddress: async ({
    country,
    city,
    address1,
    address2,
    zipCode,
    addressType,
  }) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updateUserAddress,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteUserAddress: async ({ id }) => {
    try {
      const response = await privateClient.delete(
        userEndpoints.deleteUserAddress({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  updateUserPassword: async ({ oldPassword, newPassword, confirmPassword }) => {
    try {
      const response = await privateClient.put(
        userEndpoints.updateUserPassword,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default userApi;
