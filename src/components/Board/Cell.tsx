import React from "react";
import styled from "styled-components";

import Piece from "components/Board/Piece";

import { togglePiece } from "store/game/actions";
import { useAppDispatch } from "store";

import type { Cell as CellProps } from "types/game";

const CellWrapper = styled.div<Pick<CellProps, "color" | "toggled">>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, toggled }) => (toggled ? "red" : color)};
  aspect-ratio: 1;
`;

const Cell: React.FC<CellProps> = ({
  color,
  piece,
  toggled,
  coords,
  functional,
}) => {
  const dispatch = useAppDispatch();

  return (
    <CellWrapper color={color} toggled={toggled}>
      {piece && (
        <Piece
          type={piece.type}
          color={piece.color}
          toggled={piece.toggled}
          onClick={() =>
            dispatch(togglePiece({ color, piece, coords, toggled, functional }))
          }
        />
      )}
    </CellWrapper>
  );
};

export default Cell;
