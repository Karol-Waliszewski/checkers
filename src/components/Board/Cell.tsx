import React from "react";
import styled from "styled-components";

import Piece from "components/Board/Piece";

import { toggleCell, movePiece } from "store/game/actions";
import { useAppDispatch } from "store";

import type { Cell as CellProps, Move } from "types/game";

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
  move?: Move;
};

const Cell: React.FC<Props> = ({
  color,
  piece,
  coords,
  active,
  pieceActive,
  functional,
  move,
}) => {
  const dispatch = useAppDispatch();
  const cell: CellProps = { color, piece, coords, functional };

  const onCellClick = () => {
    if (active && move) {
      dispatch(movePiece(move));
    }
  };

  return (
    <CellWrapper color={color} active={active} onClick={onCellClick}>
      {piece && (
        <Piece
          type={piece.type}
          color={piece.color}
          active={pieceActive}
          onClick={() => dispatch(toggleCell(cell))}
        />
      )}
    </CellWrapper>
  );
};

export default Cell;
