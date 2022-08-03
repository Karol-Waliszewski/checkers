import React from "react";
import styled from "styled-components";

import Board from "components/Board";
import Info from "components/Board/Info";

import { Container } from "components/shared/Layout";

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
  width: 100%;
`;

const StyledContainer = styled(Container)``;

const BoardInfo = styled.div`
  padding: 1rem;

  border: 2px solid #000;
`;

const BoardWrapper = styled.div`
  border: 2px solid #000;
  aspect-ratio: 1;
  max-height: 100vh;
  margin-left: auto;
  margin-right: auto;
`;

const Checkers = () => {
  return (
    <Main>
      <StyledContainer>
        <BoardWrapper>
          <Board />
        </BoardWrapper>

        <BoardInfo>
          <Info />
        </BoardInfo>
      </StyledContainer>
    </Main>
  );
};

export default Checkers;
