import React from "react";
import styled from "styled-components";

import { useAppSelector } from "store";
import { getBoard, getCurrentPlayer } from "store/game/selectors";

import Board from "components/Board";
import { Container } from "components/shared/Layout";
import { calculatePlainDifference } from "utils/game/engine";

const BoardWrapper = styled.div`
  border: 2px solid #000;
`;

const Checkers = () => {
  const currentPlayer = useAppSelector(getCurrentPlayer);
  const board = useAppSelector(getBoard);

  return (
    <>
      <Container>
        <p>
          Current player: {currentPlayer} | Difference:{" "}
          {calculatePlainDifference(board.grid)}
        </p>

        <BoardWrapper>
          <Board />
        </BoardWrapper>
      </Container>
    </>
  );
};

export default Checkers;
