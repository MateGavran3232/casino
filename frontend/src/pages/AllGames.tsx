import { useEffect } from "react";
import Game from "../component/game/Game";
import "../styles/AllGames.scss";
import { GameData } from "../types";
import React from "react";
import useDataStore from "../store/useDataStore";
import AddGameForm from "../component/game/AddGameFrom";
function AllGames() {
  const {
    data: gamesData,
    fetchData,
    user,
  } = useDataStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
    user: state.user,
  }));
  useEffect(() => {
    fetchData.games();
  }, []);
  return (
    <div className="allGamesContainer">
      <div className="allGamesDiv">
        {user?.role === "admin" && <AddGameForm />}
        {gamesData.map((game: GameData) => (
          <div className={`game${game.id}`} key={game.id}>
            <Game
              key={game.id}
              data={game}
              deleteGame={fetchData.deleteGame}
              role={user?.role}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGames;
