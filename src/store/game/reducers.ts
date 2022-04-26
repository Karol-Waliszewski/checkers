import { createReducer } from "@reduxjs/toolkit";
import initialState from "store/game/state";
import {
  movePiece as movePieceAction,
  reset,
  setStatus,
  toggleCell,
} from "store/game/actions";
import { areCellsSame, findPossibleMoves } from "utils/game/functional";
import { movePiece } from "utils/game/update";

const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reset, (state) => {
      state = initialState;
    })
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(toggleCell, (state, action) => {
      const isAlreadyToggled =
        state.toggledCell && areCellsSame(action.payload, state.toggledCell);

      state.possibleMoves = isAlreadyToggled
        ? []
        : findPossibleMoves(
            state.board.grid,
            action.payload.coords,
            action.payload.piece?.color
          );

      state.toggledCell = isAlreadyToggled ? null : action.payload;
    })
    .addCase(movePieceAction, (state, action) => {
      state.board.grid = state.toggledCell
        ? movePiece(state.board.grid, state.toggledCell, action.payload)
        : state.board.grid;
      state.possibleMoves = [];
      state.toggledCell = null;
    });
});

export default gameReducer;
