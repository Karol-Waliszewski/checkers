import { Grid, Cell, Piece } from "types/game";

export const areCoordsSame = (
  coords1: Cell["coords"],
  coords2: Cell["coords"]
): boolean => coords1.x === coords2.x && coords1.y === coords2.y;

export const isCellFunctional = (color: Cell["color"]) => color === "white";

export const canPlacePiece = (cell: Cell) => cell.functional;

export const isCellEmpty = (cell: Cell): boolean => !cell.piece;

export const getCellByCoords = (
  grid: Grid,
  coords: Cell["coords"]
): Cell | null =>
  grid
    .flatMap((row) => row.find((cell) => areCoordsSame(cell.coords, coords)))
    .filter((val) => val !== undefined)[0] ?? null;

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
