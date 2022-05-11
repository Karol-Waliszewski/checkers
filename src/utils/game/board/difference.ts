import { Game, Grid } from "types/game";
import { isGameDraw } from "../engine";
import { didLose } from "./functional";

const differenceWrapper =
  (calculate: (grid: Grid) => number) =>
  (game: Game): number => {
    if (isGameDraw(game)) return 0;
    if (didLose(game.board.grid, "white")) return Number.NEGATIVE_INFINITY;
    if (didLose(game.board.grid, "black")) return Number.POSITIVE_INFINITY;
    return calculate(game.board.grid);
  };

export const calculatePlainDifference = differenceWrapper((grid: Grid) =>
  grid.reduce<number>(
    (difference, row) =>
      difference +
      row.reduce<number>(
        (sum, cell) =>
          sum + (cell.piece ? (cell.piece.color === "white" ? 1 : -1) : 0),
        0
      ),
    0
  )
);

export const calculatePieceDifference = differenceWrapper((grid: Grid) =>
  grid.reduce<number>(
    (difference, row) =>
      difference +
      row.reduce<number>(
        (sum, cell) =>
          sum +
          (cell.piece
            ? (cell.piece.type === "king" ? 3 : 1) *
              (cell.piece.color === "white" ? 1 : -1)
            : 0),
        0
      ),
    0
  )
);
