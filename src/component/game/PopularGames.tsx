import { useData } from "../../hooks/useData";
import { useMemo } from "react";
import "../../styles/Games.scss";
import Game from "./Game";
import { Link } from "react-router-dom";
import { GameData } from "../../types";

function PopularGames() {
  const { data } = useData();
  const filteredData = useMemo(() => {
    if (Array.isArray(data)) {
      return data.slice(5, 15);
    }
    return [];
  }, [data]);
  const limitedData = useMemo(() => filteredData.slice(0, 12), [filteredData]);

  if (!Array.isArray(data)) {
    return <div>Loading</div>;
  }

  return (
    <div className="popularContainer">
      <div className="titleDiv">
        <h2>Popular Games</h2>
        <Link to={`/allgames`}>
          <p>Show All {">"}</p>
        </Link>
      </div>
      <div className="popularDiv">
        {limitedData.map((game: GameData) => (
          <div className={`game${game.id}`} key={game.id}>
            <Game key={game.id} data={game} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default PopularGames;
