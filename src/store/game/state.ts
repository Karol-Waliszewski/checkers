import { Board, Cell, Color, Move } from "types/game";
import { createBoard } from "utils/game/board/creation";

export type GameStatus = "ready" | "started" | "finished";

export interface GameState {
  status: GameStatus;
  currentPlayer: Color;
  board: Board;
  toggledCell: Cell | null;
  possibleMoves: Move[];
}

const initialState: GameState = {
  status: "ready",
  currentPlayer: "white",
  board: createBoard(),
  toggledCell: null,
  possibleMoves: [],
};

export default initialState;
