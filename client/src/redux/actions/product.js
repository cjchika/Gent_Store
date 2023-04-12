import axios from "axios";
import { apiUrl } from "../../config/api";
import productApi from "../../config/services/product.api";

// CREATE PRODUCT
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${apiUrl}product/createProduct`,
      newForm,
      config
    );

    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

// GET ALL SHOP PRODUCTS
export const getAllShopProducts = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllShopProductsRequest" });

    const products = productApi.getShopProducts(id);

    dispatch({ type: "getAllShopProductsSuccess", payload: products });
  } catch (error) {
    dispatch({
      type: "getAllShopProductsFail",
      payload: error.products.message,
    });
  }
};
