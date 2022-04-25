import React from "react";
import styled from "styled-components";
import { useAppSelector } from "store";
import { getBoard } from "store/game/selectors";
import Cell from "components/Board/Cell";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
`;

const Board: React.FC = () => {
  const board = useAppSelector(getBoard);

  return (
    <Grid>
      {board.grid.map((row) =>
        row.map((cell) => (
          <Cell
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
