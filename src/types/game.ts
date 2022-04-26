export type Piece = {
  type: "man" | "king";
  color: "white" | "black";
};

export type Cell = {
  color: "white" | "black";
  piece: Piece | null;
  functional: boolean;
  coords: { x: number; y: number };
};

export type Grid = Cell[][];

export type Board = {
  size: number;
  grid: Grid;
};
