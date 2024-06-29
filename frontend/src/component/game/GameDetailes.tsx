import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "../../styles/GameDetailes.scss";
import useDataStore from "../../store/useDataStore";
import React from "react";
import Mines from "./Mines";

function GameDetailes() {
  const { id } = useParams();
  const { singleGame, fetchData, resetSingleGame } = useDataStore((state) => ({
    singleGame: state.singleGame,
    fetchData: state.fetchData,
    resetSingleGame: state.actions.resetSingleGame,
  }));

  useEffect(() => {
    if (id) fetchData.singleGame(id);
    return () => {
      resetSingleGame();
    };
  }, [id, fetchData.singleGame, resetSingleGame]);

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

          {/* <div className="gameDetailesDiv">
            <Mines />
            <h1>{gameData.title}</h1>
            <p>{gameData.description}</p>
            <p>Publisher: {gameData.publisher}</p>
          </div> */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GameDetailes;
