import privateClient from "../client/ShopClient/private.client";
// import publicClient from "../client/ShopClient/public.client";

const orderEndpoints = {
  createOrder: "order/createOrder",
};

const orderAPi = {
  createOrder: async ({
    cart,
    shippingAddress,
    user,
    totalPrice,
    paymentInfo,
  }) => {
    try {
      const response = await privateClient.post(orderEndpoints.createOrder, {
        cart,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default orderAPi;
