import privateClient from "../client/ShopClient/private.client";
import publicClient from "../client/ShopClient/public.client";

const productEndpoints = {
  getShopProducts: (id) => `product/getAllShopProducts/${id}`,
  deleteShopProduct: (id) => `product/deleteShopProduct/${id}`,
  getAllProducts: "product/getAllProducts",
  getProduct: (id) => `product/getProduct/${id}`,
};

const productApi = {
  getShopProducts: async (id) => {
    try {
      const response = await privateClient.get(
        productEndpoints.getShopProducts(id)
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteShopProduct: async (id) => {
    try {
      const response = await privateClient.delete(
        productEndpoints.deleteShopProduct(id)
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllProducts: async () => {
    try {
      const response = await privateClient.get(productEndpoints.getAllProducts);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getProduct: async (id) => {
    try {
      const response = await privateClient.get(productEndpoints.getProduct(id));
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default productApi;
