import { createReducer } from "@reduxjs/toolkit";
import initialState from "store/game/state";
import { reset, setStatus, toggleCell } from "store/game/actions";
import { areCellsSame, findPossibleMoves } from "utils/game/functional";

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
    });
});

export default gameReducer;
