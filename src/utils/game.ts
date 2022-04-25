import { Grid, Board, Cell, Piece } from "types/game";

const isCellFunctional = (color: Cell["color"]) => color === "white";
export const canPlacePiece = (cell: Cell) => cell.functional;
const createCell = (
  color: Cell["color"],
  piece: Cell["piece"],
  toggled: Cell["toggled"] = false
): Cell => ({
  color,
  piece,
  toggled,
  functional: isCellFunctional(color),
});

const createPiece = (
  color: Piece["color"],
  type: Piece["type"] = "man",
  toggled: Piece["toggled"] = false
): Piece => ({ color, type, toggled });

const createGrid = (size: number) => placePieces(generateGrid(size));
const generateGrid = (size: number): Grid =>
  Array(size)
    .fill(null)
    .map((_, i) =>
      Array(size)
        .fill(null)
        .map((_, j) => createCell((i + j) % 2 === 0 ? "white" : "black", null))
    );

export const placePiece = (cell: Cell, piece: Piece | null) =>
  createCell(cell.color, piece, cell.toggled);
export const removePiece = (cell: Cell) => placePiece(cell, null);
const placePieces = (grid: Grid): Grid =>
  grid.map((row, rowIndex) =>
    row.map((cell) => {
      const rowsOfPieces = 3;
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

export const createBoard = (size: number = 10): Board => ({
  size: size,
  grid: createGrid(size),
});
