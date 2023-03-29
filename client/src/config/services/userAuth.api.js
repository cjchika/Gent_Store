import privateClient from "../client/private.client";
import publicClient from "../client/public.client";

const userEndpoints = {
  activateUser: ({ activationCode }) => `user/activation/${activationCode}`,
  loginUser: "user/loginUser",
  getUser: "user/getUser",
};

const userApi = {
  activateUser: async ({ activationCode }) => {
    try {
      const response = await privateClient.get(userEndpoints.activateUser);
      return { response };
    } catch (error) {
      return error;
    }
  },

  loginUser: async ({ email, password }) => {
    try {
      const response = await publicClient.post(userEndpoints.loginUser, {
        email,
        password,
      });
      return { response };
      localStorage.setItem("tok", response.data.token);
    } catch (error) {
      return { error };
    }
  },
};
