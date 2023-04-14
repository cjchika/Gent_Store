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

    const { response, error } = await productApi.getShopProducts(id);

    dispatch({
      type: "getAllShopProductsSuccess",
      payload: response.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopProductsFail",
      payload: error.message,
    });
  }
};

// DELETE SHOP PRODUCT

export const deleteShopProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteProductRequest" });

    const { response, error } = await productApi.deleteShopProduct(id);

    dispatch({ type: "deleteProductSuccess", payload: response.message });
  } catch (error) {
    dispatch({ type: "deleteProductFail", payload: error.message });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllProductsRequest" });

    const { response, error } = await productApi.getAllProducts();

    dispatch({
      type: "getAllProductsSuccess",
      payload: response.allProducts,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFail",
      payload: error.message,
    });
  }
};
