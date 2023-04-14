import privateClient from "../client/ShopClient/private.client";
// import publicClient from "../client/ShopClient/public.client";

const couponEndpoints = {
  createCoupon: "coupon/createCouponCode",
  getShopCoupons: (id) => `coupon/getAllShopCoupons/${id}`,
  deleteShopCoupon: (id) => `coupon/deleteShopCoupon/${id}`,
};

const couponApi = {
  createCoupon: async ({ name, minAmount, maxAmount, value, shopId }) => {
    try {
      const response = await privateClient.post(couponEndpoints.createCoupon, {
        name,
        minAmount,
        maxAmount,
        value,
        shopId,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
  getShopCoupons: async (id) => {
    try {
      const response = await privateClient.get(
        couponEndpoints.getShopCoupons(id)
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteShopCoupon: async (id) => {
    try {
      const response = await privateClient.delete(
        couponEndpoints.deleteShopCoupon(id)
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default couponApi;
