import React from "react";
import styled from "styled-components";

import Piece from "components/Board/Piece";

import { toggleCell, movePiece } from "store/game/actions";
import { useAppDispatch, useAppSelector } from "store";

import type { Cell as CellProps, Move } from "types/game";
import { getCurrentPlayer, getStatus } from "store/game/selectors";
import { isPieceOwnedByPlayer } from "utils/game/engine";

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
  const currentPlayer = useAppSelector(getCurrentPlayer);
  const gameStatus = useAppSelector(getStatus);
  const cell: CellProps = { color, piece, coords, functional };

  const onCellClick = () => {
    if (active && move) {
      dispatch(movePiece(move));
    }
  };

  const onPieceClick = () => {
    if (
      gameStatus === 'started' && 
      piece &&
      currentPlayer.type === "human" &&
      isPieceOwnedByPlayer(currentPlayer, piece)
    ) {
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
