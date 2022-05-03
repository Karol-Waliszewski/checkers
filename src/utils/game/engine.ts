import { Game, GameStatus, Move, Piece, Player } from "types/game";
import { createBoard } from "utils/game/board/creation";
import { attackPiece } from "./board/update";

export const createPlayer = (
  name: Player["name"],
  type: Player["type"],
  color: Player["color"]
): Player => ({
  name,
  type,
  color,
});

// TODO: Check if player colors differ
export const createGame = (playerA: Player, playerB: Player): Game => ({
  playerA,
  playerB,
  currentPlayer: playerA,

  status: "ready",
  board: createBoard(),
});

const setGameStatus =
  (status: GameStatus) =>
  (game: Game): Game => ({ ...game, status });
export const startGame = setGameStatus("started");
export const finishGame = setGameStatus("finished");

export const switchPlayer = (game: Game): Game => ({
  ...game,
  currentPlayer:
    game.currentPlayer.color === game.playerA.color
      ? game.playerB
      : game.playerA,
});

export const isPlayerTurn = (currentPlayer: Player, player: Player): boolean =>
  currentPlayer.color === player.color;
export const isPieceOwnedByPlayer = (player: Player, piece: Piece): boolean =>
  player.color === piece.color;

export const canMovePiece = (game: Game, move: Move): boolean =>
  game.currentPlayer.color === move.color;

export const movePiece = (game: Game, move: Move): Game =>
  canMovePiece(game, move)
    ? {
        ...switchPlayer(game),
        board: {
          ...game.board,
          grid: attackPiece(
            game.board.grid,
            move.from,
            move.to,
            move.attacking
          ),
        },
      }
    : game;
