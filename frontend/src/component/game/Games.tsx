import { useMemo } from "react";
import "../../styles/Games.scss";
import Game from "./Game";
import { GameData } from "../../types";
import ScrollableContainer from "../utils/ScrollableContainer";
import { Link } from "react-router-dom";
import React from "react";
import useDataStore from "../../store/useDataStore";
interface GameProps {
  publisher?: string;
}

function Games({ publisher }: GameProps) {
  const { data } = useDataStore((state) => ({ data: state.data }));
  const filteredData = useMemo(() => {
    if (Array.isArray(data)) {
      return data.filter(
        (game: GameData) => game.publisher === publisher && game.id !== 7
      );
    }
    return [];
  }, [data, publisher]);
  const limitedData = useMemo(() => filteredData.slice(1, 13), [filteredData]);

  if (!Array.isArray(data)) {
    return <div>Loading</div>;
  }

  return (
    <div className="gamesContainer">
      <div className="titleDiv">
        <h2>{publisher} Games</h2>
        <Link to={`/allgames`}>
          <p>Show All {">"}</p>
        </Link>
      </div>
      <ScrollableContainer>
        {limitedData.map((game: GameData) => (
          <div className={`game${game.id}`} key={game.id}>
            <Game key={game.id} data={game} />
          </div>
        ))}
      </ScrollableContainer>
    </div>
  );
}

export default Games;
