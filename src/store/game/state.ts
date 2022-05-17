import { Cell, Move, Game } from "types/game";
import { findAllPossibleMoves } from "utils/game/board/moving";
import { createGame, createAI, createHuman } from "utils/game/engine";

export type GameState = Game & {
  toggledCell: Cell | null;
  possibleMoves: Move[];
};

const initialState: () => GameState = () => {
  const game = createGame(
    createAI("A", "white", "calculateStrongPieceDifference", 1),
    createAI("B", "black", "calculateStrongPieceDifference", 9)
  );

  return {
    ...game,
    toggledCell: null,
    possibleMoves: findAllPossibleMoves(
      game.board.grid,
      game.currentPlayer.color
    ),
  };
};

export default initialState();
