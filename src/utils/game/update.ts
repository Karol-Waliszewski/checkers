import { Grid, Cell, Piece } from "types/game";
import { createCell } from "utils/game/creation";
import { areCellsSame } from "utils/game/functional";

export const updateGrid = (grid: Grid, callback: (cell: Cell) => Cell): Grid =>
  grid.map((row) => row.map(callback));

export const placePiece = (cell: Cell, piece: Piece | null): Cell =>
  createCell(cell.coords, cell.color, piece);

export const removePiece = (cell: Cell): Cell => placePiece(cell, null);

export const movePiece = (
  grid: Grid,
  from: Cell,
  to: Cell,
  piece: Piece
): Grid =>
  updateGrid(grid, (cell) => {
    if (areCellsSame(from, cell)) {
      return removePiece(from);
    }

    if (areCellsSame(to, cell)) {
      return placePiece(to, piece);
    }

    return cell;
  });
