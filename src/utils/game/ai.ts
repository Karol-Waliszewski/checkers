import { Game, Move, Player } from "types/game";
import { findAllPossibleMoves } from "./board/moving";

export const decideMove = (game: Game, player: Player): Move =>
  findAllPossibleMoves(game.board.grid, player.color)[0];
