import React from "react";

import { Box, AspectRatio, Icon } from "@chakra-ui/react";

import type { Piece as PieceProps } from "types/game";

type Props = PieceProps & { active: boolean; onClick: () => void };

const Piece: React.FC<Props> = ({ color, type, active, onClick }) => {
  return (
    <AspectRatio ratio={1} w="80%">
      <Box
        bg={active ? "red" : color}
        border="2px"
        borderColor={color === "black" ? "white" : "black"}
        borderRadius="50%"
        cursor="pointer"
        onClick={onClick}
      >
        {type === "king" && (
          <Icon
            viewBox="0 0 232.211 232.211"
            color={color === "black" ? "white" : "black"}
            maxW="70%"
            maxH="70%"
          >
            <g>
              <path
                d="M218.006,180.449l14.205-134.226L166.438,68.03L115.598,3.56L64.79,67.989L0,46.174l13.074,134.275H218.006z    M75.255,103.169l40.343-51.16l40.311,51.119l41.572-13.783l-6.467,61.104H40.295L34.35,89.395L75.255,103.169z"
                fill="currentColor"
              />
              <rect
                width="207.825"
                x="11.853"
                y="198.651"
                height="30"
                fill="currentColor"
              />
            </g>
          </Icon>
        )}
      </Box>
    </AspectRatio>
  );
};

export default Piece;
