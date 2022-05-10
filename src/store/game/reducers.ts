import { createReducer } from "@reduxjs/toolkit";
import initialState from "store/game/state";
import {
  movePiece as movePieceAction,
  reset,
  setStatus,
  toggleCell,
} from "store/game/actions";
import { areCellsSame } from "utils/game/board/functional";
import { findAllPossibleMoves } from "utils/game/board/moving";
import { makeMove } from "utils/game/engine";

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

      state.possibleMoves = findAllPossibleMoves(
        state.board.grid,
        action.payload.piece!.color
      );

      state.toggledCell = isAlreadyToggled ? null : action.payload;
    })
    .addCase(movePieceAction, (state, action) => ({
      ...makeMove(state, action.payload),
      toggledCell: null,
      possibleMoves: [],
    }));
});

export default gameReducer;
