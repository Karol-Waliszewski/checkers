import React from "react";
import styled, { css } from "styled-components";

import kingIcon from "assets/icons/crown.svg";

import type { Piece as PieceProps } from "types/game";

const PieceWrapper = styled.div<Pick<PieceProps, "color" | "toggled">>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  aspect-ratio: 1;

  background-color: ${({ color, toggled }) => (toggled ? "red" : color)};
  border-radius: 50%;
  border: 2px solid #000;
`;

const PieceIcon = styled.img<Pick<PieceProps, "color" | "toggled">>`
  max-width: 70%;
  max-height: 70%;

  ${({ color, toggled }) =>
    !toggled &&
    color === "black" &&
    css`
      filter: brightness(0) invert(1);
    `};
`;

const Piece: React.FC<PieceProps> = ({ color, type, toggled }) => {
  return (
    <PieceWrapper color={color} toggled={toggled}>
      {type === "king" && (
        <PieceIcon src={kingIcon} color={color} toggled={toggled} />
      )}
    </PieceWrapper>
  );
};

export default Piece;
