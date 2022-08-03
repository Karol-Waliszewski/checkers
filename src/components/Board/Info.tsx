import React from "react";

import { Button, Text, Heading, Box, Divider } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "store";
import { getGame } from "store/game/selectors";
import { resetGame, startGame } from "store/game/actions";

import { parseTime } from "utils/time";

const Info: React.FC = () => {
  const game = useAppSelector(getGame);
  const dispatch = useAppDispatch();

  return (
    <Box p="5">
      <Heading as="h2">Game info</Heading>
      {game.winner === undefined && (
        <Text>
          Current player: {game.currentPlayer.name} ({game.currentPlayer.color})
        </Text>
      )}
      <Text>Status: {game.status}</Text>
      {game.winner !== undefined && (
        <Text>Winner: {game.winner === null ? "draw" : game.winner.name}</Text>
      )}

      <Divider my="3" />

      <Box mb="3">
        <Heading as="h3" size="md">
          {game.playerA.name}
        </Heading>
        <Text>Moves: {game.playerA.moves}</Text>
        {game.playerA.type === "ai" && (
          <Text>Time: {parseTime(game.playerA.time)}ms</Text>
        )}
      </Box>

      <Box mb="3">
        <Heading as="h3" size="md">
          {game.playerB.name}
        </Heading>
        <Text>Moves: {game.playerB.moves}</Text>
        {game.playerB.type === "ai" && (
          <Text>Time: {parseTime(game.playerB.time)}ms</Text>
        )}
      </Box>

      <Divider my="3" />

      {game.status === "ready" && (
        <Button onClick={() => dispatch(startGame())}>Start Game</Button>
      )}
      {(game.status === "started" || game.status === "finished") && (
        <Button onClick={() => dispatch(resetGame())}>Reset Game</Button>
      )}
    </Box>
  );
};

export default Info;
