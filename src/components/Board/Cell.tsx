import React from "react";
import styled from "styled-components";

import Piece from "components/Board/Piece";

import { toggleCell, movePiece } from "store/game/actions";
import { useAppDispatch, useAppSelector } from "store";

import type { Cell as CellProps } from "types/game";
import { getCurrentPlayer, getPossibleMoves } from "store/game/selectors";
import { getOptimalMove } from "utils/game/board/functional";
import { canMovePiece } from "utils/game/engine";

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
  const possibleMoves = useAppSelector(getPossibleMoves);
  const currentPlayer = useAppSelector(getCurrentPlayer);
  const cell: CellProps = { color, piece, coords, functional };
  const move = getOptimalMove(possibleMoves, cell);

  const onCellClick = () => {
    if (active && move) {
      dispatch(movePiece(move));
    }
  };

  const onPieceClick = () => {
    if (piece && canMovePiece(currentPlayer, piece)) {
      dispatch(toggleCell(cell));
    }
  };

  return (
    <CellWrapper color={color} active={active} onClick={onCellClick}>
      {piece && (
        <Piece
          type={piece.type}
          color={piece.color}
          active={pieceActive}
          onClick={onPieceClick}
        />
      )}
    </CellWrapper>
  );
};

export default Cell;
