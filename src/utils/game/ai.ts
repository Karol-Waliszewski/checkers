import { Game, Move, Player } from "types/game";
import { calculatePlainDifference } from "./board/difference";
import { findAllPossibleMoves } from "./board/moving";
import { makeMove } from "./engine";

const minmax = (
  game: Game,
  depth: number = 4,
  alpha = Number.NEGATIVE_INFINITY,
  beta = Number.POSITIVE_INFINITY
): number => {
  if (game.status === "finished" || depth === 0) {
    return calculatePlainDifference(game);
  }

  const possibleMoves = findAllPossibleMoves(
    game.board.grid,
    game.currentPlayer.color
  );

  if (game.currentPlayer.color === "white") {
    let maxEval = Number.NEGATIVE_INFINITY;
    for (const move of possibleMoves) {
      const evaluated = minmax(makeMove(game, move), depth - 1, alpha, beta);
      maxEval = Math.max(maxEval, evaluated);
      alpha = Math.max(alpha, evaluated);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Number.POSITIVE_INFINITY;
    for (const move of possibleMoves) {
      const evaluated = minmax(makeMove(game, move), depth - 1, alpha, beta);
      minEval = Math.min(minEval, evaluated);
      beta = Math.min(beta, evaluated);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const decideMove = (game: Game, player: Player): Move => {
  const possibleMoves = findAllPossibleMoves(game.board.grid, player.color);
  const differences = possibleMoves.map((move) => minmax(makeMove(game, move)));
  if (player.color === "white")
    return possibleMoves[differences.indexOf(Math.max(...differences))];
  // player.color === 'black'
  return possibleMoves[differences.indexOf(Math.min(...differences))];
};
