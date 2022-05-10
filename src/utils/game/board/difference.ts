import { Grid } from "types/game";
import { didLose } from "./functional";

const differenceWrapper =
  (calculate: (grid: Grid) => number) =>
  (grid: Grid): number => {
    if (didLose(grid, "white")) return Number.NEGATIVE_INFINITY;
    if (didLose(grid, "black")) return Number.POSITIVE_INFINITY;
    return calculate(grid);
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
