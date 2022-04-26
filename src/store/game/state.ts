import { Board } from "types/game";
import { createBoard } from "utils/game/creation";

export type GameStatus = "ready" | "started" | "finished";

export interface GameState {
  status: GameStatus;
  board: Board;
}

const initialState: GameState = {
  status: "ready",
  board: createBoard(),
};

export default initialState;
