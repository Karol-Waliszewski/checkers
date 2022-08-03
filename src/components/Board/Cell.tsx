import React from "react";

import { GridItem, AspectRatio } from "@chakra-ui/react";
import Piece from "components/Board/Piece";

import { toggleCell, movePiece } from "store/game/actions";
import { useAppDispatch, useAppSelector } from "store";
import { getCurrentPlayer, getStatus } from "store/game/selectors";

import { isPieceOwnedByPlayer } from "utils/game/engine";

import type { Cell as CellProps, Move } from "types/game";

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
      dispatch(movePiece({ move, decisionTime: 0 }));
    }
  };

  const onPieceClick = () => {
    if (
      gameStatus === "started" &&
      piece &&
      currentPlayer.type === "human" &&
      isPieceOwnedByPlayer(currentPlayer, piece)
    ) {
      dispatch(toggleCell(cell));
    }
  };

  return (
    <AspectRatio ratio={1}>
      <GridItem
        bg={active ? "red" : color}
        onClick={onCellClick}
        cursor={active ? "pointer" : "initial"}
      >
        {piece && (
          <Piece
            type={piece.type}
            color={piece.color}
            active={pieceActive}
            onClick={onPieceClick}
          />
        )}
      </GridItem>
    </AspectRatio>
  );
};

export default Cell;
