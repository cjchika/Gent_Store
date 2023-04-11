import shopApi from "../../config/services/shop.api";

export const getSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "GetSellerRequest",
    });
    const { response, error } = await shopApi.getShop();
    dispatch({
      type: "GetSellerResponse",
      payload: response.seller,
    });
  } catch (error) {
    dispatch({
      type: "GetSellerError",
      payload: error.message,
    });
  }
};
