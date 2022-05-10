import { Game, GameStatus, Move, Piece, Player } from "types/game";
import { createBoard } from "utils/game/board/creation";
import { hasPieces } from "./board/functional";
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
  currentPlayer: playerA, // TODO: Change to null
  winner: null,
  drawCounter: 0,

  status: "started", // TODO: change to 'ready'
  board: createBoard(),
});

const setGameStatus =
  (status: GameStatus) =>
  (game: Game): Game => ({ ...game, status });
export const startGame = setGameStatus("started");
export const finishGame = (game: Game, winner: Player | null): Game =>
  setGameStatus("finished")({ ...game, winner });

export const updateDrawCounter = (game: Game, piece: Piece | null): Game =>
  piece
    ? piece?.type === "king"
      ? { ...game, drawCounter: game.drawCounter + 1 }
      : { ...game, drawCounter: 0 }
    : game;

export const isGameDraw = (game: Game): boolean => game.drawCounter >= 14;
export const didPlayerLose = (game: Game, player: Player): boolean =>
  hasPieces(game.board.grid, player.color) === false;

export const updateGameStatus = (game: Game): Game => {
  if (isGameDraw(game)) return finishGame(game, null);
  if (didPlayerLose(game, game.playerA)) return finishGame(game, game.playerB);
  if (didPlayerLose(game, game.playerB)) return finishGame(game, game.playerA);
  return game;
};

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
  game.status === "started" && game.currentPlayer.color === move.color;

const movePiece = (game: Game, move: Move): Game => ({
  ...game,
  board: {
    ...game.board,
    grid: attackPiece(game.board.grid, move.from, move.to, move.attacking),
  },
});

export const makeMove = (game: Game, move: Move): Game =>
  canMovePiece(game, move)
    ? updateGameStatus(movePiece(updateDrawCounter(switchPlayer(game), move.from.piece), move))
    : game;