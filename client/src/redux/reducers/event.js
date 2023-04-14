import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  event: null,
  events: null,
  isLoadingEvent: false,
};

export const eventReducer = createReducer(initialState, {
  // CREATE EVENT
  eventCreateRequest: (state) => {
    state.isLoadingEvent = true;
  },

  eventCreateSuccess: (state, action) => {
    state.isLoadingEvent = false;
    state.event = action.payload;
    state.success = true;
  },

  eventCreateFail: (state, action) => {
    state.isLoadingEvent = false;
    state.error = action.payload;
    state.success = false;
  },

  // GET ALL SHOP EVENTS

  getAllShopEventsRequest: (state) => {
    state.isLoadingEvent = true;
  },

  getAllShopEventsSuccess: (state, action) => {
    state.isLoadingEvent = false;
    state.events = action.payload;
  },

  getAllShopEventsFail: (state, action) => {
    state.isLoadingEvent = false;
    state.error = action.payload;
  },

  // DELETE SHOP EVENT
  deleteEventRequest: (state) => {
    state.isLoadingEvent = true;
  },

  deleteEventSuccess: (state, action) => {
    state.isLoadingEvent = false;
    state.message = action.payload;
  },

  deleteEventFail: (state, action) => {
    state.isLoadingEvent = false;
    state.error = action.payload;
  },
});
