import { createAction } from "@reduxjs/toolkit";
import { GameStatus } from "store/game/state";
import { Cell } from "types/game";

export const reset = createAction("game/reset");
export const setStatus = createAction<GameStatus>("game/setStatus");
export const toggleCell = createAction<Cell>("game/toggleCell");
export const movePiece = createAction<Cell>("game/movePiece");