import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store";
import { getStatus } from "../../store/game/selectors";
import { reset, setStatus } from "../../store/game/actions";

const StyledButton = styled.button`
  margin: 1rem;
  padding: 0.5rem 1rem;
`;

const Board: React.FC = () => {
  const status = useAppSelector(getStatus);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>That's gonna be a board in the future... </h1>
      <p>{status}</p>
      <StyledButton onClick={() => dispatch(setStatus("started"))}>
        Start game
      </StyledButton>
      <StyledButton onClick={() => dispatch(reset())}>Reset</StyledButton>
      <StyledButton onClick={() => dispatch(setStatus("finished"))}>
        Finish game
      </StyledButton>
    </div>
  );
};

export default Board;
