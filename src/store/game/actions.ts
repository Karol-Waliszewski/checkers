import { createAction } from "@reduxjs/toolkit";
import { Cell, Move, GameStatus } from "types/game";

export const resetGame = createAction("game/resetGame");
export const startGame = createAction("game/startGame");
export const setStatus = createAction<GameStatus>("game/setStatus");
export const toggleCell = createAction<Cell>("game/toggleCell");
export const movePiece = createAction<{ move: Move; decisionTime: number }>(
  "game/movePiece"
);
