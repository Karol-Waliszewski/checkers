import { Board, Cell } from "types/game";
import { createBoard } from "utils/game/creation";

export type GameStatus = "ready" | "started" | "finished";

export interface GameState {
  status: GameStatus;
  board: Board;
  toggledCell: Cell | null;
  possibleMoves: Cell[];
}

const initialState: GameState = {
  status: "ready",
  board: createBoard(),
  toggledCell: null,
  possibleMoves: [],
};

export default initialState;
