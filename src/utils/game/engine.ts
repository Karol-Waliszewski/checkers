import { Color, Grid, Piece } from "types/game";

export const switchPlayer = (currentPlayer: Color): Color =>
  currentPlayer === "white" ? "black" : "white";

export const canMovePiece = (currentPlayer: Color, piece: Piece) =>
  currentPlayer === piece.color;

export const calculatePlainDifference = (grid: Grid) =>
  grid.reduce<number>(
    (difference, row) =>
      difference +
      row.reduce<number>(
        (sum, cell) =>
          sum + (cell.piece ? (cell.piece.color === "white" ? 1 : -1) : 0),
        0
      ),
    0
  );
