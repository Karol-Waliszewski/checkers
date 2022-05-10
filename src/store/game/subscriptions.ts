import { Store } from "store";
import { decideMove } from "utils/game/ai";
import { movePiece } from "./actions";
import { getCurrentPlayer, getGame, getStatus } from "./selectors";

export const AiMove = (store: Store) => () => {
  const state = store.getState();
  const getCurrentStatus = getStatus(state);
  const currentPlayer = getCurrentPlayer(state);
  const game = getGame(state);
  if (currentPlayer.type === "ai" && getCurrentStatus === "started") {
    store.dispatch(movePiece(decideMove(game, currentPlayer)));
  }
};
