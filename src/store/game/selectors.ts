import { RootState } from "store";
import { Game } from "types/game";

export const getGame = (state: RootState): Game => state.game;
export const getStatus = (state: RootState) => state.game.status;
export const getBoard = (state: RootState) => state.game.board;
export const getToggledCell = (state: RootState) => state.game.toggledCell;
export const getPossibleMoves = (state: RootState) => state.game.possibleMoves;
export const getCurrentPlayer = (state: RootState) => state.game.currentPlayer;
