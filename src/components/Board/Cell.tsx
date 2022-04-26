import React from "react";
import styled from "styled-components";

import Piece from "components/Board/Piece";

import { toggleCell } from "store/game/actions";
import { useAppDispatch } from "store";

import type { Cell as CellProps } from "types/game";

const CellWrapper = styled.div<Pick<Props, "color" | "active">>`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ color, active }) => (active ? "red" : color)};
  aspect-ratio: 1;
`;

type Props = CellProps & {
  active: boolean;
  pieceActive: boolean;
};

const Cell: React.FC<Props> = ({
  color,
  piece,
  coords,
  active,
  pieceActive,
  functional,
}) => {
  const dispatch = useAppDispatch();

  return (
    <CellWrapper color={color} active={active}>
      {piece && (
        <Piece
          type={piece.type}
          color={piece.color}
          active={pieceActive}
          onClick={() =>
            dispatch(toggleCell({ color, piece, coords, functional }))
          }
        />
      )}
    </CellWrapper>
  );
};

export default Cell;
