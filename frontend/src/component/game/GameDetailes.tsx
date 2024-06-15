import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/GameDetailes.scss";
import useDataStore from "../../store/useDataStore";
import React from "react";

function GameDetailes() {
  const { id } = useParams();
  const { singleGame, fetchSingleGame, resetSingleGame } = useDataStore(
    (state) => ({
      singleGame: state.singleGame,
      fetchSingleGame: state.fetchSingleGame,
      resetSingleGame: state.resetSingleGame,
    })
  );

  useEffect(() => {
    if (id) fetchSingleGame(id);
    return () => {
      resetSingleGame();
    };
  }, [id, fetchSingleGame, resetSingleGame]);

  const [gameData] = Array.isArray(singleGame) ? singleGame : [{}];
  return (
    <div className="gameDetailesContainer">
      {gameData ? (
        <>
          <img
            src={gameData.bigImage}
            alt={gameData.title}
            className="gameImg"
          />
          <div className="gameDetailesDiv">
            <h1>{gameData.title}</h1>
            <p>{gameData.description}</p>
            <p>Publisher: {gameData.publisher}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GameDetailes;
