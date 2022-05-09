import { Grid, Cell, Color, Move, Point } from "types/game";
import { createMove } from "./creation";

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

export const isCellFunctional = (color: Cell["color"]) => color === "white";
export const isCellEmpty = (cell: Cell): boolean => !cell.piece;
export const isCellOccupiedByEnemy = (cell: Cell, onMove: Color): boolean =>
  !isCellEmpty(cell) && cell.piece?.color !== onMove;
export const isCellOccupiedByAlly = (cell: Cell, onMove: Color): boolean =>
  !isCellEmpty(cell) && cell.piece?.color === onMove;
export const isCellInArray = (cells: Cell[], cell: Cell) =>
  cells.some((value) => areCellsSame(value, cell));

export const isMovePossible = (moves: Move[], cell: Cell) =>
  isCellInArray(
    moves.map((move) => move.to),
    cell
  );
export const getMoveWeight = (move: Move): number => move.attacking.length;
export const getOptimalMove = (moves: Move[], cell?: Cell) =>
  moves.reduce<Move | null>(
    (max, curr) =>
      getMoveWeight(curr) >= (max ? getMoveWeight(max) : 0) &&
      (!cell || areCellsSame(cell, curr.to))
        ? curr
        : max,
    null
  ) as Move;

export const canPlacePiece = (cell: Cell) => cell.functional;
export const didMoveReachEnd = (grid: Grid, cell: Cell) =>
  cell.coords.y === 0 || cell.coords.y === grid.length - 1;

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

  return [
    ...cornersToCheck.flatMap((corner) => {
      if (isCellEmpty(corner)) {
        let move = createMove(
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
            createMove(lastMove?.from ?? from, behind, [
              ...(lastMove?.attacking ?? []),
              corner,
            ])
          );
        }
      }

      return [];
    }),
  ];
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

  return [
    ...(!firstIteration && isCellEmpty(from)
      ? [createMove(lastMove.from, from, [...lastMove.attacking])]
      : []),
    ...cornersToCheck.flatMap((corner) => {
      if (
        firstIteration &&
        isCellEmpty(corner) &&
        isCellInArray(forwardCorners, corner)
      ) {
        return createMove(from, corner, []);
      }

      if (isCellOccupiedByEnemy(corner, onMove)) {
        const behind = getCellBehind(grid, from, corner);

        if (behind && isCellEmpty(behind)) {
          return findPossibleMovesMan(
            grid,
            behind,
            onMove,
            createMove(lastMove?.from ?? from, behind, [
              ...(lastMove?.attacking ?? []),
              corner,
            ])
          );
        }
      }

      return [];
    }),
  ];
};
