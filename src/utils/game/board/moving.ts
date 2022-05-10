import { Grid, Cell, Color, Move } from "types/game";
import { createMove } from "./creation";
import {
  areCellsSame,
  calculateCoordsDirection,
  getCellBehind,
  getCellByOffset,
  getCellsWithPieces,
  getCornerCells,
  isCellEmpty,
  isCellInArray,
  isCellOccupiedByEnemy,
} from "./functional";

export const getCellMove = (
  moves: Move[],
  from: Cell | null,
  to: Cell
): Move | undefined =>
  from === null
    ? undefined
    : moves.find(
        (move) => areCellsSame(from, move.from) && areCellsSame(to, move.to)
      );

export const getMoveWeight = (move: Move): number => move.attacking.length;
export const getBestWeight = (moves: Move[]): number =>
  Math.max(...moves.map((move) => getMoveWeight(move)));
export const getOptimalMove = (moves: Move[], cell?: Cell) =>
  moves.reduce<Move | null>(
    (max, curr) =>
      getMoveWeight(curr) >= (max ? getMoveWeight(max) : 0) &&
      (!cell || areCellsSame(cell, curr.to))
        ? curr
        : max,
    null
  ) as Move;
export const getOptimalMoves = (moves: Move[]): Move[] => {
  const best = getBestWeight(moves);
  return moves.filter((move) => getMoveWeight(move) === best);
};

export const canPlacePiece = (cell: Cell) => cell.functional;
export const didMoveReachEnd = (grid: Grid, cell: Cell) =>
  cell.coords.y === 0 || cell.coords.y === grid.length - 1;

// TODO: Fix the issue when piece makes a loop and could go back to the starting point
export const findPossibleMoves = (
  grid: Grid,
  from: Cell | null,
  onMove: Color,
  lastMove: Move | null = null
): Move[] =>
  from?.piece
    ? from?.piece?.type === "man"
      ? findPossibleMovesMan(grid, from, onMove, lastMove)
      : findPossibleMovesKing(grid, from, onMove, lastMove)
    : [];

export const findPossibleMovesKing = (
  grid: Grid,
  from: Cell | null,
  onMove: Color,
  lastMove: Move | null = null
): Move[] => {
  if (from === null) {
    return [];
  }

  let cornersToCheck: Cell[] = [];

  if (lastMove) {
    const corner = getCellByOffset(
      grid,
      from,
      calculateCoordsDirection(lastMove.from.coords, lastMove.to.coords)
    );
    if (corner) cornersToCheck = [corner];
  } else {
    const { forwardLeft, forwardRight, backwardLeft, backwardRight } =
      getCornerCells(grid, from, onMove);

    cornersToCheck = [
      forwardLeft,
      forwardRight,
      backwardLeft,
      backwardRight,
    ].filter((corner) => corner) as Cell[];
  }

  return getOptimalMoves([
    ...cornersToCheck.flatMap((corner) => {
      if (isCellEmpty(corner)) {
        let move = createMove(
          onMove,
          lastMove?.from ?? from,
          corner,
          lastMove?.attacking ?? []
        );
        return [move, ...findPossibleMovesKing(grid, corner, onMove, move)];
      }

      if (isCellOccupiedByEnemy(corner, onMove)) {
        const behind = getCellBehind(grid, from, corner);

        if (behind && isCellEmpty(behind)) {
          return findPossibleMovesMan(
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

export const findPossibleMovesMan = (
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
          return findPossibleMovesMan(
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
  getOptimalMoves(
    getCellsWithPieces(grid, onMove).flatMap((cell) =>
      findPossibleMoves(grid, cell, onMove)
    )
  );
