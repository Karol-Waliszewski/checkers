import { Grid, Board, Cell, Piece } from "types/game";

export const areCoordsSame = (
  coords1: Cell["coords"],
  coords2: Cell["coords"]
): boolean => coords1.x === coords2.x && coords1.y === coords2.y;

const isCellFunctional = (color: Cell["color"]) => color === "white";

export const canPlacePiece = (cell: Cell) => cell.functional;

export const isCellEmpty = (cell: Cell): boolean => !cell.piece;

export const getCellByCoords = (
  grid: Grid,
  coords: Cell["coords"]
): Cell | null =>
  grid
    .flatMap((row) => row.find((cell) => areCoordsSame(cell.coords, coords)))
    .filter((val) => val !== undefined)[0] ?? null;

export const createCell = (
  coords: Cell["coords"],
  color: Cell["color"],
  piece: Cell["piece"],
  toggled: Cell["toggled"] = false
): Cell => ({
  coords,
  color,
  piece,
  toggled,
  functional: isCellFunctional(color),
});

export const createPiece = (
  color: Piece["color"],
  type: Piece["type"] = "man",
  toggled: Piece["toggled"] = false
): Piece => ({ color, type, toggled });

const createGrid = (size: number, rowsOfPieces: number) =>
  placePieces(generateGrid(size), rowsOfPieces);

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

export const placePiece = (cell: Cell, piece: Piece | null) =>
  createCell(cell.coords, cell.color, piece, cell.toggled);

export const removePiece = (cell: Cell) => placePiece(cell, null);

export const movePiece = (from: Cell, to: Cell, piece: Piece) => ({
  from: removePiece(from),
  to: placePiece(to, piece),
});

const placePieces = (grid: Grid, rowsOfPieces: number): Grid =>
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

export const togglePiece = (grid: Grid, coords: Cell["coords"]): Grid =>
  grid.map((row) =>
    row.map((cell) =>
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
    )
  );

export const toggleCells = (grid: Grid, cells: Cell[]): Grid =>
  grid.map((row) =>
    row.map((cell) =>
      createCell(
        cell.coords,
        cell.color,
        cell.piece,
        cells.some((value) =>
          areCoordsSame(value.coords, cell.coords) 
        )
      )
    )
  );

export const findPossibleMoves = (
  grid: Grid,
  coords: Cell["coords"],
  moving?: Piece["color"],
  starting: boolean = true
): Cell[] => {
  const cell = getCellByCoords(grid, coords);

  if (
    !cell ||
    !moving ||
    !isCellFunctional(cell.color) ||
    (cell.piece?.color === moving && !starting)
  ) {
    return [];
  }

  if (isCellEmpty(cell)) {
    return [cell];
  }

  // If white go down, if black go up
  const DifferenceY = cell.piece!.color === "white" ? 1 : -1;

  return [
    ...findPossibleMoves(
      grid,
      { x: coords.x - 1, y: coords.y + DifferenceY },
      moving,
      false
    ),
    ...findPossibleMoves(
      grid,
      { x: coords.x + 1, y: coords.y + DifferenceY },
      moving,
      false
    ),
  ];
};
