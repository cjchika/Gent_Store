import privateClient from "../client/ShopClient/private.client";
// import publicClient from "../client/ShopClient/public.client";

const eventEndpoints = {
  getShopEvents: (id) => `product/getAllShopEvents/${id}`,
  deleteShopEvent: (id) => `product/deleteShopEvent/${id}`,
};

const eventApi = {
  getShopEvents: async (id) => {
    try {
      const response = await privateClient.get(
        eventEndpoints.getShopEvents(id)
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteShopEvent: async (id) => {
    try {
      const response = await privateClient.delete(
        eventEndpoints.deleteShopEvent(id)
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default eventApi;
