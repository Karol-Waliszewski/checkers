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

export type PlayerType = "ai" | "human";

export interface Controler {
  name: string;
  type: PlayerType;
  color: Color;
}

export interface AI extends Controler {
  type: "ai";
  decideMove: EvaluationFunction;
}

export interface Human extends Controler {
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
  | "calculatePlainDifference"
  | "calculateCenterDifference";
