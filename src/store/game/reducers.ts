import { createReducer } from "@reduxjs/toolkit";
import initialState from "store/game/state";
import {
  actionBuilder,
} from "store/game/actions";

const gameReducer = createReducer(initialState, actionBuilder);

export default gameReducer;
