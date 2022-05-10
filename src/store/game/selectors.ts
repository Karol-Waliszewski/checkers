import { RootState } from "store";
import { Game } from "types/game";
import { areCellsSame } from "utils/game/board/functional";

export const getGame = (state: RootState): Game => state.game;
export const getCurrentPlayer = (state: RootState) => state.game.currentPlayer;
export const getStatus = (state: RootState) => state.game.status;
export const getBoard = (state: RootState) => state.game.board;
export const getToggledCell = (state: RootState) => state.game.toggledCell;
export const getPossibleMoves = (state: RootState) => state.game.possibleMoves;
export const getToggledCellMoves = (state: RootState) =>
  state.game.toggledCell
    ? state.game.possibleMoves.filter((move) =>
        areCellsSame(move.from, state.game.toggledCell!)
      )
    : [];
