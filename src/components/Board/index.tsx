import React from "react";

import { useAppSelector } from "store";
import {
  getBoard,
  getToggledCellMoves,
  getToggledCell,
} from "store/game/selectors";

import { Grid } from "@chakra-ui/react";

import Cell from "components/Board/Cell";

import { areCellsSame } from "utils/game/board/functional";
import { getCellMove } from "utils/game/board/moving";

const Board: React.FC = () => {
  const board = useAppSelector(getBoard);
  const activeCell = useAppSelector(getToggledCell);
  const possibleMoves = useAppSelector(getToggledCellMoves);

  return (
    <Grid
      templateColumns={`repeat(${board.size}, 1fr)`}
      w="100%"
      border="1px"
      borderColor="black"
    >
      {board.grid.map((row) =>
        row.map((cell) => {
          const move = getCellMove(possibleMoves, activeCell, cell);
          return (
            <Cell
              key={`${cell.coords.x}:${cell.coords.y}`}
              coords={cell.coords}
              color={cell.color}
              piece={cell.piece}
              functional={cell.functional}
              pieceActive={activeCell ? areCellsSame(cell, activeCell) : false}
              active={Boolean(move)}
              move={move}
            />
          );
        })
      )}
    </Grid>
  );
};

export default Board;
