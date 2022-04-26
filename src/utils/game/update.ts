import { Grid, Cell, Piece } from "types/game";
import { createCell, createPiece } from "utils/game/creation";
import { areCoordsSame } from "utils/game/functional";

export const updateGrid = (grid: Grid, callback: (cell: Cell) => Cell): Grid =>
  grid.map((row) => row.map(callback));

export const placePiece = (cell: Cell, piece: Piece | null): Cell =>
  createCell(cell.coords, cell.color, piece, cell.toggled);

export const removePiece = (cell: Cell): Cell => placePiece(cell, null);

export const movePiece = (
  grid: Grid,
  from: Cell,
  to: Cell,
  piece: Piece
): Grid =>
  updateGrid(grid, (cell) => {
    if (areCoordsSame(from.coords, cell.coords)) {
      return removePiece(from);
    }

    if (areCoordsSame(to.coords, cell.coords)) {
      return placePiece(to, piece);
    }

    return cell;
  });

export const togglePiece = (grid: Grid, coords: Cell["coords"]): Grid =>
  updateGrid(grid, (cell) =>
    createCell(
      cell.coords,
      cell.color,
      cell.piece
        ? createPiece(
            cell.piece.color,
            cell.piece.type,
            areCoordsSame(cell.coords, coords) ? !cell.piece.toggled : false
          )
        : null,
      cell.toggled
    )
  );

export const toggleCells = (grid: Grid, cells: Cell[]): Grid =>
  updateGrid(grid, (cell) =>
    createCell(
      cell.coords,
      cell.color,
      cell.piece,
      cells.some((value) => areCoordsSame(value.coords, cell.coords))
    )
  );
