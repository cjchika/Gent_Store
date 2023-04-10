import privateClient from "../client/UserClient/private.client";
import publicClient from "../client/UserClient/public.client";

const userEndpoints = {
  activateUser: ({ activationCode }) => `user/activation/${activationCode}`,
  loginUser: "user/loginUser",
  getUser: "user/getUser",
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
};

export default userApi;
