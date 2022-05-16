import { AI, EvaluationFunction, Game, Move } from "types/game";
import {
  calculateCenterDifference,
  calculateDistanceDifference,
  calculatePieceDifference,
  calculatePlainDifference,
  calculateStrongCenterDifference,
  calculateStrongPieceDifference,
  differenceWrapper,
} from "./board/difference";
import { findAllPossibleMoves } from "./board/moving";
import { makeMove } from "./engine";

const minmax = (
  game: Game,
  evaluation: AI["decideMove"],
  depth: number = 5,
  alpha = Number.NEGATIVE_INFINITY,
  beta = Number.POSITIVE_INFINITY
): number => {
  if (game.status === "finished" || depth === 0) {
    return getEvaluationFunction(evaluation)(game);
  }

  const possibleMoves = findAllPossibleMoves(
    game.board.grid,
    game.currentPlayer.color
  );

  if (game.currentPlayer.color === "white") {
    let maxEval = Number.NEGATIVE_INFINITY;
    for (const move of possibleMoves) {
      const evaluated = minmax(
        makeMove(game, move),
        evaluation,
        depth - 1,
        alpha,
        beta
      );
      maxEval = Math.max(maxEval, evaluated);
      alpha = Math.max(alpha, evaluated);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Number.POSITIVE_INFINITY;
    for (const move of possibleMoves) {
      const evaluated = minmax(
        makeMove(game, move),
        evaluation,
        depth - 1,
        alpha,
        beta
      );
      minEval = Math.min(minEval, evaluated);
      beta = Math.min(beta, evaluated);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const decideMove = (game: Game, player: AI): Move => {
  const possibleMoves = findAllPossibleMoves(game.board.grid, player.color);
  const differences = possibleMoves.map((move) =>
    minmax(makeMove(game, move), player.decideMove, player.depth)
  );
  if (player.color === "white")
    return possibleMoves[differences.indexOf(Math.max(...differences))];
  // player.color === 'black'
  return possibleMoves[differences.indexOf(Math.min(...differences))];
};

export const getEvaluationFunction = (
  name: EvaluationFunction
): ReturnType<typeof differenceWrapper> => {
  switch (name) {
    case "calculatePlainDifference":
      return calculatePlainDifference;
    case "calculatePieceDifference":
      return calculatePieceDifference;
    case "calculateStrongPieceDifference":
      return calculateStrongPieceDifference;
    case "calculateCenterDifference":
      return calculateCenterDifference;
    case "calculateStrongCenterDifference":
      return calculateStrongCenterDifference;
    case "calculateDistanceDifference":
      return calculateDistanceDifference;

    default:
      throw new Error("Incorrect evaluation function");
  }
};
