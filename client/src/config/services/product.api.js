import privateClient from "../client/ShopClient/private.client";
import publicClient from "../client/ShopClient/public.client";

const productEndpoints = {
  getShopProducts: ({ id }) => `product/getAllShopProducts/${id}`,
};

const productApi = {
  getShopProducts: async ({ id }) => {
    try {
      const response = await privateClient.get(
        productEndpoints.getShopProducts({ id })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default productApi;
