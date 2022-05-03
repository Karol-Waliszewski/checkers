import { createAction } from "@reduxjs/toolkit";
import { Cell, Move, GameStatus } from "types/game";

export const reset = createAction("game/reset");
export const setStatus = createAction<GameStatus>("game/setStatus");
export const toggleCell = createAction<Cell>("game/toggleCell");
export const movePiece = createAction<Move>("game/movePiece");
