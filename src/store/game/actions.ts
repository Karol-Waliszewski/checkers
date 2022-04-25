import { createAction } from "@reduxjs/toolkit";
import { GameStatus } from "./state";

export const reset = createAction("game/reset");
export const setStatus = createAction<GameStatus>("game/setStatus");
