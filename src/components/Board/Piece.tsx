import React from "react";
import styled, { css } from "styled-components";

import kingIcon from "assets/icons/crown.svg";

import type { Piece as PieceProps } from "types/game";

const PieceWrapper = styled.div<Pick<PieceProps, "color"> & Active>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  aspect-ratio: 1;

  background-color: ${({ color, active }) => (active ? "red" : color)};
  border-radius: 50%;
  border: 2px solid ${({ color }) => (color === "white" ? "black" : "white")};

  cursor: pointer;
`;

const PieceIcon = styled.img<Pick<PieceProps, "color"> & Active>`
  max-width: 70%;
  max-height: 70%;

  ${({ color, active }) =>
    !active &&
    color === "black" &&
    css`
      filter: brightness(0) invert(1);
    `};
`;

type Active = {
  active: boolean
}
type Props = PieceProps & Active & { onClick: () => void };

const Piece: React.FC<Props> = ({ color, type, active, onClick }) => {
  return (
    <PieceWrapper color={color} active={active} onClick={onClick}>
      {type === "king" && (
        <PieceIcon src={kingIcon} color={color} active={active} />
      )}
    </PieceWrapper>
  );
};

export default Piece;
