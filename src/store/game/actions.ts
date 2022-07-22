import { createAction, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import initialState, { GameState } from "store/game/state";
import { Cell, Move, GameStatus } from "types/game";

import { findAllPossibleMoves } from "utils/game/board/moving";
import { areCellsSame } from "utils/game/board/functional";
import { makeMove, startGame as startGameEngine } from "utils/game/engine";

export const resetGame = createAction("game/resetGame");
export const startGame = createAction("game/startGame");
export const setStatus = createAction<GameStatus>("game/setStatus");
export const toggleCell = createAction<Cell>("game/toggleCell");
export const movePiece = createAction<{ move: Move; decisionTime: number }>(
  "game/movePiece"
);

export const actionBuilder = (builder: ActionReducerMapBuilder<GameState>) => {
  builder
    .addCase(resetGame, () => ({ ...initialState }))
    .addCase(startGame, (state) => ({
      ...state,
      ...startGameEngine(state),
    }))
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(toggleCell, (state, action) => {
      const isAlreadyToggled =
        state.toggledCell && areCellsSame(action.payload, state.toggledCell);
      state.toggledCell = isAlreadyToggled ? null : action.payload;
    })
    .addCase(movePiece, (state, action) => {
      const gameState = makeMove(
        state,
        action.payload.move,
        action.payload.decisionTime
      );

      return {
        ...gameState,
        toggledCell: null,
        possibleMoves:
          gameState.currentPlayer.type === "human"
            ? findAllPossibleMoves(
                gameState.board.grid,
                gameState.currentPlayer.color
              )
            : [],
      };
    })
};
