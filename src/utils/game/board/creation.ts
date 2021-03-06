import { Grid, Board, Cell, Piece, Move } from "types/game";
import { isCellFunctional, canPlacePiece } from "utils/game/board/functional";
import { placePiece } from "utils/game/board/update";

export const createMove = (
  color: Move['color'],
  from: Move['from'],
  to: Move['to'],
  attacking: Move['attacking'] = []
): Move => ({
  color,
  from,
  to,
  attacking,
});

export const createCell = (
  coords: Cell["coords"],
  color: Cell["color"],
  piece: Cell["piece"]
): Cell => ({
  coords,
  color,
  piece,
  functional: isCellFunctional(color),
});

export const createPiece = (
  color: Piece["color"],
  type: Piece["type"] = "man"
): Piece => ({ color, type });

const createGrid = (size: number, rowsOfPieces: number) =>
  setupPieces(generateGrid(size), rowsOfPieces);

const generateGrid = (size: number): Grid =>
  Array(size)
    .fill(null)
    .map((_, i) =>
      Array(size)
        .fill(null)
        .map((_, j) =>
          createCell(
            { x: j, y: i },
            (i + j) % 2 === 0 ? "white" : "black",
            null
          )
        )
    );

const setupPieces = (grid: Grid, rowsOfPieces: number): Grid =>
  grid.map((row, rowIndex) =>
    row.map((cell) => {
      let piece = null;

      if (canPlacePiece(cell)) {
        if (rowIndex < rowsOfPieces) {
          piece = createPiece("white");
        } else if (rowIndex >= grid.length - rowsOfPieces) {
          piece = createPiece("black");
        }
      }

      return placePiece(cell, piece);
    })
  );

export const createBoard = (
  size: number = 8,
  rowsOfPieces: number = 2
): Board => ({
  size: size,
  grid: createGrid(size, rowsOfPieces),
});
