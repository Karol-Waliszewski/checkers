import { RootState } from "store";

export const getState = (state: RootState) => state.game;
export const getStatus = (state: RootState) => state.game.status;
export const getBoard = (state: RootState) => state.game.board;
export const getToggledCell = (state: RootState) => state.game.toggledCell;
export const getPossibleMoves = (state: RootState) => state.game.possibleMoves;
