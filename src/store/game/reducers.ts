import { createReducer, current } from "@reduxjs/toolkit";
import initialState from "store/game/state";
import { reset, setStatus, togglePiece } from "store/game/actions";
import {
  areCoordsSame,
  createCell,
  createPiece,
  findPossibleMoves,
  placePiece,
} from "utils/game";

const gameReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(reset, (state) => {
      state.status = "ready";
    })
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(togglePiece, (state, action) => {
      const moves = findPossibleMoves(
        current(state.board.grid),
        action.payload.coords,
        action.payload.piece?.color
      );

      state.board.grid = current(state.board.grid).map((row) =>
        row.map((cell) => {
          let isCellToggled = moves.some((value) =>
            areCoordsSame(value.coords, cell.coords)
          );

          const newPiece = !cell.piece
            ? null
            : createPiece(
                cell.piece.color,
                cell.piece.type,
                areCoordsSame(cell.coords, action.payload.coords)
                  ? !cell.piece.toggled
                  : false
              );

          const newCell = createCell(
            cell.coords,
            cell.color,
            newPiece,
            isCellToggled
          );

          return placePiece(newCell, newPiece);
        })
      );
    });
});

export default gameReducer;
