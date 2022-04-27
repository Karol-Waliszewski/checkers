import { Grid, Cell, Piece } from "types/game";
import { createCell } from "utils/game/board/creation";
import { areCellsSame, isCellInArray } from "utils/game/board/functional";

export const updateGrid = (grid: Grid, callback: (cell: Cell) => Cell): Grid =>
  grid.map((row) => row.map(callback));

export const placePiece = (cell: Cell, piece: Piece | null): Cell =>
  createCell(cell.coords, cell.color, piece);

export const removePiece = (cell: Cell): Cell => placePiece(cell, null);

export const attackPiece = (
  grid: Grid,
  from: Cell,
  to: Cell,
  attacked: Cell[]
): Grid =>
  updateGrid(grid, (cell) => {
    if (areCellsSame(from, cell) || isCellInArray(attacked, cell)) {
      return removePiece(cell);
    }

    if (areCellsSame(to, cell)) {
      return placePiece(cell, from.piece);
    }

    return cell;
  });

export const movePiece = (grid: Grid, from: Cell, to: Cell): Grid =>
  attackPiece(grid, from, to, []);
