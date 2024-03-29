export type Color = "white" | "black";

export type Point = { x: number; y: number };

export type Piece = {
  type: "man" | "king";
  color: Color;
};

export type Cell = {
  color: Color;
  piece: Piece | null;
  functional: boolean;
  coords: Point;
};

export type Grid = Cell[][];

export type Board = {
  size: number;
  grid: Grid;
};

export type Move = {
  from: Cell;
  to: Cell;
  attacking: Cell[];
  color: Color;
};

export interface Controller {
  name: string;
  type: "ai" | "human";
  color: Color;
  moves: number;
  time: number;
}

export interface AI extends Controller {
  type: "ai";
  decideMove: EvaluationFunction;
  depth: number;
}

export interface Human extends Controller {
  type: "human";
}

export type Player = AI | Human;

export type GameStatus = "ready" | "started" | "finished";

export type Game = {
  playerA: Player;
  playerB: Player;
  winner: Player | null | undefined; // null == Game resulted draw
  drawCounter: number;

  currentPlayer: Player;
  status: GameStatus;
  board: Board;
};

export type EvaluationFunction =
  | "calculatePieceDifference"
  | "calculateStrongPieceDifference"
  | "calculatePlainDifference"
  | "calculateCenterDifference"
  | "calculateStrongCenterDifference"
  | "calculateDistanceDifference";
