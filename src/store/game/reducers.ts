import { createReducer } from "@reduxjs/toolkit";
import initialState from "store/game/state";
import { reset, setStatus, clickPiece } from "store/game/actions";
import { togglePiece, toggleCells } from "utils/game/update";
import { findPossibleMoves } from "utils/game/functional";

const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reset, (state) => {
      state.status = "ready";
    })
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(clickPiece, (state, action) => {
      const possibleMoves = !action.payload.piece?.toggled
        ? findPossibleMoves(
            state.board.grid,
            action.payload.coords,
            action.payload.piece?.color
          )
        : [];

      state.board.grid = togglePiece(
        toggleCells(state.board.grid, possibleMoves),
        action.payload.coords
      );
    });
});

export default gameReducer;
