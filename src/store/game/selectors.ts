import { RootState } from "store";

export const getState = (state: RootState) => state.game;
export const getStatus = (state: RootState) => state.game.status;
