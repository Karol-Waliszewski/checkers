import { Grid, Cell, Color, Point } from "types/game";
import { findAllPossibleMoves } from "./moving";

export const areCellsSame = (cell1: Cell, cell2: Cell): boolean =>
  areCoordsSame(cell1.coords, cell2.coords);
export const areCoordsSame = (
  coords1: Cell["coords"],
  coords2: Cell["coords"]
): boolean => coords1.x === coords2.x && coords1.y === coords2.y;
export const calculateCoordsDistance = (
  from: Cell["coords"],
  to: Cell["coords"]
): Point => ({ x: to.x - from.x, y: to.y - from.y });
export const calculateCoordsDirection = (
  from: Cell["coords"],
  to: Cell["coords"]
): Point => {
  const { x, y } = calculateCoordsDistance(from, to);
  return { x: x > 0 ? 1 : x < 0 ? -1 : 0, y: y > 0 ? 1 : y < 0 ? -1 : 0 };
};

export const isCellFunctional = (color: Cell["color"]) => color === "black";
export const isCellEmpty = (cell: Cell): boolean => !cell.piece;
export const hasPiece = (cell: Cell): boolean => !!cell.piece;
export const isCellOccupiedByEnemy = (cell: Cell, onMove: Color): boolean =>
  !isCellEmpty(cell) && cell.piece?.color !== onMove;
export const isCellOccupiedByAlly = (cell: Cell, onMove: Color): boolean =>
  !isCellEmpty(cell) && cell.piece?.color === onMove;
export const isCellInArray = (cells: Cell[], cell: Cell) =>
  cells.some((value) => areCellsSame(value, cell));

export const canPlacePiece = (cell: Cell) => cell.functional;
export const didMoveReachEnd = (grid: Grid, cell: Cell) =>
  cell.coords.y === 0 || cell.coords.y === grid.length - 1;

export const getCellsWithPieces = (grid: Grid, color: Color): Cell[] =>
  grid.flatMap((row) => row.filter((cell) => cell.piece?.color === color));

export const getCellByCoords = (
  grid: Grid,
  coords: Cell["coords"]
): Cell | null =>
  grid
    .flatMap((row) => row.find((cell) => areCoordsSame(cell.coords, coords)))
    .filter((val) => val !== undefined)[0] ?? null;

export const getCellByOffset = (
  grid: Grid,
  from: Cell,
  offset: Point
): Cell | null =>
  getCellByCoords(grid, {
    x: from.coords.x + offset.x,
    y: from.coords.y + offset.y,
  });

export const getCellBehind = (
  grid: Grid,
  from: Cell,
  to: Cell
): ReturnType<typeof getCellByCoords> =>
  getCellByOffset(grid, to, {
    x: to.coords.x - from.coords.x,
    y: to.coords.y - from.coords.y,
  });

export const getCornerCells = (grid: Grid, cell: Cell, onMove: Color) => ({
  forwardLeft: getCellByOffset(grid, cell, {
    x: -1,
    y: onMove === "white" ? 1 : -1,
  }),
  forwardRight: getCellByOffset(grid, cell, {
    x: 1,
    y: onMove === "white" ? 1 : -1,
  }),
  backwardLeft: getCellByOffset(grid, cell, {
    x: -1,
    y: onMove === "black" ? 1 : -1,
  }),
  backwardRight: getCellByOffset(grid, cell, {
    x: 1,
    y: onMove === "black" ? 1 : -1,
  }),
});

export const hasPieces = (grid: Grid, color: Color): boolean =>
  Boolean(grid.find((row) => row.find((cell) => cell.piece?.color === color)));

export const didLose = (grid: Grid, color: Color): boolean =>
  hasPieces(grid, color) === false ||
  findAllPossibleMoves(grid, color).length === 0;
