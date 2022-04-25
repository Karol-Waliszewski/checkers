import { createReducer } from "@reduxjs/toolkit";
import initialState from "./state";
import { reset, setStatus } from "./actions";

const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reset, (state, action) => {
      state.status = "ready";
    })
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    });
});

export default gameReducer;
