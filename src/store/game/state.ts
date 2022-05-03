import { Cell, Move, Game } from "types/game";
import { createGame, createPlayer } from "utils/game/engine";

export type GameState = Game & {
  toggledCell: Cell | null;
  possibleMoves: Move[];
};

const initialState: GameState = {
  ...createGame(
    createPlayer("A", "ai", "black"),
    createPlayer("B", "ai", "white")
  ),
  toggledCell: null,
  possibleMoves: [],
};

export default initialState;
