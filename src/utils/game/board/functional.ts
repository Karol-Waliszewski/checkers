import { Grid, Cell, Color, Move } from "types/game";
import { createMove } from "./creation";

export const areCellsSame = (cell1: Cell, cell2: Cell): boolean =>
  areCoordsSame(cell1.coords, cell2.coords);

export const areCoordsSame = (
  coords1: Cell["coords"],
  coords2: Cell["coords"]
): boolean => coords1.x === coords2.x && coords1.y === coords2.y;

export const isCellFunctional = (color: Cell["color"]) => color === "white";
export const isCellEmpty = (cell: Cell): boolean => !cell.piece;
export const isCellOccupiedByEnemy = (cell: Cell, onMove: Color): boolean =>
  !isCellEmpty(cell) && cell.piece?.color !== onMove;

export const isCellOccupiedByAlly = (cell: Cell, onMove: Color): boolean =>
  !isCellEmpty(cell) && cell.piece?.color === onMove;

export const isCellInArray = (cells: Cell[], cell: Cell) =>
  cells.some((value) => areCellsSame(value, cell));

export const getMoveWeight = (move: Move): number => move.attacking.length;

export const isMovePossible = (moves: Move[], cell: Cell) =>
  isCellInArray(
    moves.map((move) => move.to),
    cell
  );

export const getOptimalMove = (moves: Move[], cell?: Cell) =>
  moves.reduce<Move | null>(
    (max, curr) =>
      getMoveWeight(curr) >= (max ? getMoveWeight(max) : 0) &&
      (!cell || areCellsSame(cell, curr.to))
        ? curr
        : max,
    null
  ) as Move;

export const getOptimalMoves = (moves: Move[], cell?: Cell) => {
  const maxWeight = getMoveWeight(getOptimalMove(moves, cell));
  return moves.filter((move) => getMoveWeight(move) === maxWeight);
};

export const canPlacePiece = (cell: Cell) => cell.functional;

export const getCellsWithPieces = (grid: Grid, color: Color): Cell[] =>
  grid.flatMap((row) => row.filter((cell) => cell.piece?.color === color));

export const getCellByCoords = (
  grid: Grid,
  coords: Cell["coords"]
): Cell | null =>
  grid
    .flatMap((row) => row.find((cell) => areCoordsSame(cell.coords, coords)))
    .filter((val) => val !== undefined)[0] ?? null;

export const getCellBehind = (
  grid: Grid,
  from: Cell,
  to: Cell
): ReturnType<typeof getCellByCoords> =>
  getCellByCoords(grid, {
    x: to.coords.x + (to.coords.x - from.coords.x),
    y: to.coords.y + (to.coords.y - from.coords.y),
  });

export const getCornerCells = (grid: Grid, cell: Cell, onMove: Color) => ({
  forwardLeft: getCellByCoords(grid, {
    x: cell.coords.x - 1,
    y: cell.coords.y + (onMove === "white" ? 1 : -1),
  }),
  forwardRight: getCellByCoords(grid, {
    x: cell.coords.x + 1,
    y: cell.coords.y + (onMove === "white" ? 1 : -1),
  }),
  backwardLeft: getCellByCoords(grid, {
    x: cell.coords.x - 1,
    y: cell.coords.y + (onMove === "black" ? 1 : -1),
  }),
  backwardRight: getCellByCoords(grid, {
    x: cell.coords.x + 1,
    y: cell.coords.y + (onMove === "black" ? 1 : -1),
  }),
});

// TODO: Fix the issue when piece makes a loop and could go back to the starting point
export const findPossibleMoves = (
  grid: Grid,
  from: Cell | null,
  onMove: Color,
  lastMove: Move | null = null
): Move[] => {
  if (from === null) {
    return [];
  }

  const firstIteration = lastMove === null;
  const { forwardLeft, forwardRight, backwardLeft, backwardRight } =
    getCornerCells(grid, from, onMove);

  const forwardCorners = [forwardLeft, forwardRight].filter(
    (corner) => corner !== null
  ) as Cell[];
  const backwardCorners = [backwardLeft, backwardRight].filter(
    (corner) => corner !== null
  ) as Cell[];
  const cornersToCheck = [...forwardCorners, ...backwardCorners].filter(
    (corner) => !isCellInArray(lastMove?.attacking ?? [], corner)
  );

  return getOptimalMoves([
    ...(!firstIteration && isCellEmpty(from)
      ? [createMove(onMove, lastMove.from, from, [...lastMove.attacking])]
      : []),
    ...cornersToCheck.flatMap((corner) => {
      if (
        firstIteration &&
        isCellEmpty(corner) &&
        isCellInArray(forwardCorners, corner)
      ) {
        return createMove(onMove, from, corner, []);
      }

      if (isCellOccupiedByEnemy(corner, onMove)) {
        const behind = getCellBehind(grid, from, corner);

        if (behind && isCellEmpty(behind)) {
          return findPossibleMoves(
            grid,
            behind,
            onMove,
            createMove(onMove, lastMove?.from ?? from, behind, [
              ...(lastMove?.attacking ?? []),
              corner,
            ])
          );
        }
      }

      return [];
    }),
  ]);
};

export const findAllPossibleMoves = (grid: Grid, onMove: Color): Move[] =>
  getCellsWithPieces(grid, onMove).flatMap((cell) =>
    findPossibleMoves(grid, cell, onMove)
  );

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
