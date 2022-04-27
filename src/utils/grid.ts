import { Point } from "types/game";

export const calculateDistance = (from: Point, to: Point): Point => ({
  x: from.x - to.x,
  y: from.y - to.y,
});

export const isPointInArea = (area: { from: Point; to: Point }, point: Point) =>
  area.from.x < point.x &&
  area.from.y < point.y &&
  point.x < area.to.x &&
  point.y < area.to.y;
