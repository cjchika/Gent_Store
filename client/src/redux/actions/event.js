import axios from "axios";
import { apiUrl } from "../../config/api";
import eventApi from "../../config/services/event.api";

// CREATE EVENT
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(
      `${apiUrl}event/createEvent`,
      newForm,
      config
    );

    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// GET ALL SHOP EVENTS
export const getAllShopEvents = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllShopEventsRequest" });

    const { response, error } = await eventApi.getShopEvents(id);
    console.log(response);

    dispatch({
      type: "getAllShopEventsSuccess",
      payload: response.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopEventsFail",
      payload: error.message,
    });
  }
};

// DELETE SHOP EVENT

export const deleteShopEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });

    const { response, error } = await eventApi.deleteShopEvent(id);

    dispatch({ type: "deleteEventSuccess", payload: response.message });
  } catch (error) {
    dispatch({ type: "deleteEventFail", payload: error.message });
  }
};
