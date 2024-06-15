import { useEffect, useMemo } from "react";
import Game from "../component/game/Game";
import "../styles/AllGames.scss";
import { GameData } from "../types";
import React from "react";
import useDataStore from "../store/useDataStore";
function AllGames() {
  const { data: gamesData, fetchGames } = useDataStore((state) => ({
    data: state.data,
    fetchGames: state.fetchGames,
  }));
  useEffect(() => {
    fetchGames();
  }, []);
  return (
    <div className="allGamesContainer">
      <div className="allGamesDiv">
        {gamesData.map((game: GameData) => (
          <div className={`game${game.id}`} key={game.id}>
            <Game key={game.id} data={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGames;
