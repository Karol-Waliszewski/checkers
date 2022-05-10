import { Cell, Move, Game } from "types/game";
import { findAllPossibleMoves } from "utils/game/board/moving";
import { createGame, createPlayer } from "utils/game/engine";

export type GameState = Game & {
  toggledCell: Cell | null;
  possibleMoves: Move[];
};

const initialState: () => GameState = () => {
  const game = createGame(
    createPlayer("A", "player", "black"),
    createPlayer("B", "ai", "white")
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
