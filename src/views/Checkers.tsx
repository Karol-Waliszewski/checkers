import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";

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
`;

const Checkers = () => {
  return (
    <Main>
      <StyledContainer>
        <Row gutter={[16, 16]} align="stretch">
          <Col span={24} md={{ span: 16 }}>
            <BoardWrapper>
              <Board />
            </BoardWrapper>
          </Col>
          <Col span={24} md={{ span: 8 }}>
            <BoardInfo>
              <Info />
            </BoardInfo>
          </Col>
        </Row>
      </StyledContainer>
    </Main>
  );
};

export default Checkers;
