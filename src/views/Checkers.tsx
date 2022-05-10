import React from "react";
import styled from "styled-components";

import { useAppSelector } from "store";
import { getGame } from "store/game/selectors";

import Board from "components/Board";
import { Container } from "components/shared/Layout";
import { calculatePlainDifference } from "utils/game/board/difference";

const BoardWrapper = styled.div`
  border: 2px solid #000;
`;

const Checkers = () => {
  const game = useAppSelector(getGame);

  return (
    <>
      <Container>
        <p>
          Current player: {game.currentPlayer.color} | Difference:{" "}
          {calculatePlainDifference(game.board.grid)} | Status: {game.status} |
          Winner:{" "}
          {game.winner ? game.winner.name : game === null ? "draw" : "none"}
        </p>

        <BoardWrapper>
          <Board />
        </BoardWrapper>
      </Container>
    </>
  );
};

export default Checkers;
