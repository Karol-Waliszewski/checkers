import { Board, Cell, Move } from "types/game";
import { createBoard } from "utils/game/creation";

export type GameStatus = "ready" | "started" | "finished";

export interface GameState {
  status: GameStatus;
  board: Board;
  toggledCell: Cell | null;
  possibleMoves: Move[];
}

const initialState: GameState = {
  status: "ready",
  board: createBoard(),
  toggledCell: null,
  possibleMoves: [],
};

export default initialState;
