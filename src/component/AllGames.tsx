import { useData } from "../hooks/useData";
import { useMemo } from "react";
import Game from "./Game";
import "../styles/AllGames.scss";
interface GameData {
  id: number;
  title: string;
  image: string;
  description: string;
  publisher: string;
}
function AllGames() {
  const { data } = useData();
  const gamesData = useMemo(() => {
    if (Array.isArray(data)) {
      return data.filter((item) => item.publisher !== "");
    }
    return [];
  }, [data]);
  console.log(gamesData);
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
