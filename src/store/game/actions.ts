import { createAction } from "@reduxjs/toolkit";
import { GameStatus } from "store/game/state";

export const reset = createAction("game/reset");
export const setStatus = createAction<GameStatus>("game/setStatus");
