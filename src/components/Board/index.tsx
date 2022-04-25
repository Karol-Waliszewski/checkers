import React from "react";
import styled from "styled-components";
import { useAppSelector } from "store";
import { getBoard } from "store/game/selectors";
import Cell from "components/Board/Cell";

import { Board as BoardType } from "types/game";

const Grid = styled.div<Pick<BoardType, "size">>`
  display: grid;
  grid-template-columns: repeat(${({ size }) => size}, 1fr);
`;

const Board: React.FC = () => {
  const board = useAppSelector(getBoard);

  return (
    <Grid size={board.size}>
      {board.grid.map((row) =>
        row.map((cell) => (
          <Cell
            key={`${cell.coords.x}:${cell.coords.y}`}
            coords={cell.coords}
            color={cell.color}
            piece={cell.piece}
            toggled={cell.toggled}
            functional={cell.functional}
          />
        ))
      )}
    </Grid>
  );
};

export default Board;
