import React from "react";

import { useAppDispatch, useAppSelector } from "store";
import { getGame } from "store/game/selectors";
import { resetGame, startGame } from "store/game/actions";
import { parseTime } from "utils/time";

const Info: React.FC = () => {
  const game = useAppSelector(getGame);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>Game info</h2>
      {game.winner === undefined && (
        <p>
          Current player: {game.currentPlayer.name} ({game.currentPlayer.color})
        </p>
      )}
      <p>Status: {game.status}</p>
      {game.winner !== undefined && (
        <p>Winner: {game.winner === null ? "draw" : game.winner.name}</p>
      )}
      <hr />
      <h3>{game.playerA.name}</h3>
      <p>Moves: {game.playerA.moves}</p>
      {game.playerA.type === "ai" && (
        <p>Time: {parseTime(game.playerA.time)}ms</p>
      )}

      <h3>{game.playerB.name}</h3>
      <p>Moves: {game.playerB.moves}</p>
      {game.playerB.type === "ai" && (
        <p>Time: {parseTime(game.playerB.time)}ms</p>
      )}

      <hr />
      {game.status === "ready" && (
        <button onClick={() => dispatch(startGame())}>Start Game</button>
      )}
      {(game.status === "started" || game.status === "finished") && (
        <button onClick={() => dispatch(resetGame())}>Reset Game</button>
      )}
    </div>
  );
};

export default Info;
