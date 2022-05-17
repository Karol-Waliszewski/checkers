import {
  AI,
  Controller,
  Game,
  GameStatus,
  Human,
  Move,
  Piece,
  Player,
} from "types/game";
import { createBoard } from "utils/game/board/creation";
import { didLose } from "./board/functional";
import { attackPiece } from "./board/update";

export const createHuman = (
  name: Human["name"],
  color: Human["color"]
): Human => ({
  name,
  type: "human",
  color,
  moves: 0,
  time: 0,
});

export const createAI = (
  name: AI["name"],
  color: AI["color"],
  decideMove: AI["decideMove"],
  depth = 4
): AI => ({
  name,
  type: "ai",
  color,
  decideMove,
  depth,
  moves: 0,
  time: 0,
});

export const updateControllerMoves = <T extends Controller>(
  controller: T,
  moves: Controller["moves"]
): T => ({ ...controller, moves });

export const updateControllerTime = <T extends Controller>(
  controller: T,
  time: Controller["time"]
): T => ({ ...controller, time });

// TODO: Check if player colors differ
export const createGame = (playerA: Player, playerB: Player): Game => ({
  playerA,
  playerB,
  currentPlayer: playerA,
  winner: undefined,
  drawCounter: 0,

  status: "ready",
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

export const isGameDraw = (game: Game): boolean => game.drawCounter >= 15;

export const didPlayerLose = (game: Game, player: Player): boolean =>
  game.status === "finished"
    ? Boolean(game.winner && game.winner.color !== player.color)
    : didLose(game.board.grid, player.color);

export const updateGameStatus = (game: Game): Game => {
  if (isGameDraw(game)) return finishGame(game, null);
  if (didPlayerLose(game, game.playerA)) return finishGame(game, game.playerB);
  if (didPlayerLose(game, game.playerB)) return finishGame(game, game.playerA);
  return game;
};

export const updatePlayerMeasurements = (
  game: Game,
  move: Move,
  decisionTime: number
): Game => ({
  ...game,
  playerA:
    game.playerA.color === move.color
      ? updateControllerTime(
          updateControllerMoves(game.playerA, game.playerA.moves + 1),
          game.playerA.time + decisionTime
        )
      : game.playerA,
  playerB:
    game.playerB.color === move.color
      ? updateControllerTime(
          updateControllerMoves(game.playerB, game.playerB.moves + 1),
          game.playerB.time + decisionTime
        )
      : game.playerB,
});

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

export const makeMove = (
  game: Game,
  move: Move,
  decisionTime: number = 0
): Game =>
  canMovePiece(game, move)
    ? updateGameStatus(
        updatePlayerMeasurements(
          movePiece(
            updateDrawCounter(switchPlayer(game), move.from.piece),
            move
          ),
          move,
          decisionTime
        )
      )
    : game;
