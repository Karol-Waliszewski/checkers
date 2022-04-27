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
};
