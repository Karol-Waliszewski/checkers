import { Game, Grid, Cell } from "types/game";
import { isGameDraw } from "../engine";
import { didLose, hasPiece, isCellEmpty } from "./functional";

export const differenceWrapper =
  (calculate: (grid: Grid) => number) =>
  (game: Game): number => {
    if (isGameDraw(game)) return 0;
    if (didLose(game.board.grid, "white")) return Number.NEGATIVE_INFINITY;
    if (didLose(game.board.grid, "black")) return Number.POSITIVE_INFINITY;
    return calculate(game.board.grid);
  };

export const calculateDifference =
  (calculation: (sum: number, cell: Cell) => number) => (grid: Grid) =>
    grid.reduce<number>(
      (difference, row) => difference + row.reduce<number>(calculation, 0),
      0
    );

export const calculatePlainDifference = differenceWrapper(
  calculateDifference(
    (sum, cell) =>
      sum + (hasPiece(cell) ? (cell.piece!.color === "white" ? 1 : -1) : 0)
  )
);

export const calculateCenterDifference = differenceWrapper((grid: Grid) =>
  calculateDifference((sum, cell) => {
    if (isCellEmpty(cell)) return sum;

    const center = {
      from: Math.floor(grid.length / 2) - 1,
      to: Math.floor(grid.length / 2) + 1,
    };

    const sign = cell.piece!.color === "white" ? 1 : -1;
    const points =
      center.from <= cell.coords.x &&
      cell.coords.x <= center.to &&
      center.from <= cell.coords.y &&
      cell.coords.y <= center.to
        ? 5
        : 1;

    return sum + points * sign;
  })(grid)
);

export const calculatePieceDifference = differenceWrapper(
  calculateDifference(
    (sum, cell) =>
      sum +
      (hasPiece(cell)
        ? (cell.piece!.type === "king" ? 3 : 1) *
          (cell.piece!.color === "white" ? 1 : -1)
        : 0)
  )
);
