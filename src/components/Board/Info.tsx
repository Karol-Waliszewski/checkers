import React from "react";
import { Typography, Divider } from "antd";

import { useAppDispatch, useAppSelector } from "store";
import { getGame } from "store/game/selectors";
import { Button } from "antd";
import { resetGame, startGame } from "store/game/actions";
import { parseTime } from "utils/time";

const { Title, Paragraph } = Typography;

const Info: React.FC = () => {
  const game = useAppSelector(getGame);
  const dispatch = useAppDispatch();

  return (
    <Typography>
      <Title level={2}>Game info</Title>
      {game.winner === undefined && (
        <Paragraph>
          Current player: {game.currentPlayer.name} ({game.currentPlayer.color})
        </Paragraph>
      )}
      <Paragraph>Status: {game.status}</Paragraph>
      {game.winner !== undefined && (
        <Paragraph>
          Winner: {game.winner === null ? "draw" : game.winner.name}
        </Paragraph>
      )}
      <Divider />
      <Title level={3}>{game.playerA.name}</Title>
      <Paragraph>Moves: {game.playerA.moves}</Paragraph>
      {game.playerA.type === "ai" && (
        <Paragraph>Time: {parseTime(game.playerA.time)}ms</Paragraph>
      )}

      <Title level={3}>{game.playerB.name}</Title>
      <Paragraph>Moves: {game.playerB.moves}</Paragraph>
      {game.playerB.type === "ai" && (
        <Paragraph>Time: {parseTime(game.playerB.time)}ms</Paragraph>
      )}

      <Divider />
      {game.status === "ready" && (
        <Button onClick={() => dispatch(startGame())}>Start Game</Button>
      )}
      {(game.status === "started" || game.status === "finished") && (
        <Button onClick={() => dispatch(resetGame())}>Reset Game</Button>
      )}
    </Typography>
  );
};

export default Info;
