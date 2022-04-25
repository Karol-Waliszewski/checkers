export type GameStatus = "ready" | "started" | "finished";

export interface GameState {
  status: GameStatus;
}

const initialState: GameState = {
  status: "ready",
};

export default initialState;
