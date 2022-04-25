import React from "react";
import styled from "styled-components";

import Piece from "components/Board/Piece";

import type { Cell as CellProps } from "types/game";

const CellWrapper = styled.div<Pick<CellProps, "color">>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ color }) => color};
  aspect-ratio: 1;
`;

const Cell: React.FC<CellProps> = ({ color, piece }) => {
  return (
    <CellWrapper color={color}>
      {piece && (
        <Piece type={piece.type} color={piece.color} toggled={piece.toggled} />
      )}
    </CellWrapper>
  );
};

export default Cell;
