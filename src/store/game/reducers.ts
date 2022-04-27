import { createReducer, current } from "@reduxjs/toolkit";
import initialState from "store/game/state";
import {
  movePiece as movePieceAction,
  reset,
  setStatus,
  toggleCell,
} from "store/game/actions";
import { areCellsSame, findPossibleMoves } from "utils/game/board/functional";
import { attackPiece } from "utils/game/board/update";
import { switchPlayer } from "utils/game/engine";

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

      state.possibleMoves =
        !isAlreadyToggled && action.payload.piece
          ? findPossibleMoves(
              state.board.grid,
              action.payload,
              action.payload.piece?.color
            )
          : [];

      state.toggledCell = isAlreadyToggled ? null : action.payload;
    })
    .addCase(movePieceAction, (state, action) => {
      state.board.grid = attackPiece(
        current(state.board.grid),
        action.payload.from,
        action.payload.to,
        action.payload.attacking
      );
      state.possibleMoves = [];
      state.toggledCell = null;
      state.currentPlayer = switchPlayer(state.currentPlayer);
    });
});

export default gameReducer;
