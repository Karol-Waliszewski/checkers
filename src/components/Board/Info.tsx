import React from "react";
import { Typography, Divider } from "antd";

import { useAppDispatch, useAppSelector } from "store";
import { getGame } from "store/game/selectors";
import { Button } from "antd";
import { resetGame, startGame } from "store/game/actions";

const { Title, Paragraph } = Typography;

const Info: React.FC = () => {
  const game = useAppSelector(getGame);
  const dispatch = useAppDispatch();

  return (
    <Typography>
      <Title level={2}>Game info</Title>

      <Paragraph>Current player: {game.currentPlayer.color}</Paragraph>
      <Paragraph>Status: {game.status}</Paragraph>

      {game.winner !== null && (
        <Paragraph>
          Winner: {game.winner === undefined ? "draw" : game.winner.name}
        </Paragraph>
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
