import privateClient from "../client/ShopClient/private.client";
import publicClient from "../client/ShopClient/public.client";

const shopEndpoints = {
  activateShop: ({ activationCode }) => `seller/activation/${activationCode}`,
  getShopInfo: (id) => `seller/getShopInfo/${id}`,
  loginShop: "seller/loginShop",
  getShop: "seller/getSeller",
};

const shopApi = {
  activateShop: async ({ activationCode }) => {
    try {
      const response = await publicClient.get(
        shopEndpoints.activateShop({ activationCode })
      );
      localStorage.setItem("shoptok", response.token);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  loginShop: async ({ email, password }) => {
    try {
      const response = await publicClient.post(shopEndpoints.loginShop, {
        email,
        password,
      });
      localStorage.setItem("shoptok", response.token);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getShop: async () => {
    try {
      const response = await privateClient.get(shopEndpoints.getShop);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getShopInfo: async (id) => {
    try {
      const response = await privateClient.get(shopEndpoints.getShopInfo(id));
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default shopApi;
