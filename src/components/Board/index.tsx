import React from "react";
import styled from "styled-components";
import { useAppSelector } from "store";
import {
  getBoard,
  getPossibleMoves,
  getToggledCell,
} from "store/game/selectors";
import Cell from "components/Board/Cell";

import { Board as BoardType } from "types/game";
import { areCellsSame } from "utils/game/board/functional";
import { isMovePossible } from "utils/game/board/moving";

const Grid = styled.div<Pick<BoardType, "size">>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, 1fr);
`;

const Board: React.FC = () => {
  const board = useAppSelector(getBoard);
  const activeCell = useAppSelector(getToggledCell);
  const possibleMoves = useAppSelector(getPossibleMoves);

  return (
    <Grid size={board.size}>
      {board.grid.map((row) =>
        row.map((cell) => (
          <Cell
            key={`${cell.coords.x}:${cell.coords.y}`}
            coords={cell.coords}
            color={cell.color}
            piece={cell.piece}
            functional={cell.functional}
            pieceActive={activeCell ? areCellsSame(cell, activeCell) : false}
            active={isMovePossible(possibleMoves, cell)}
          />
        ))
      )}
    </Grid>
  );
};

export default Board;
