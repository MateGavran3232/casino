import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { GameData } from "../../types";

function SearchBar(): JSX.Element {
  const { data } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [isResultsVisible, setResultsVisible] = useState(false);

  const filteredGames = useMemo(() => {
    if (Array.isArray(data)) {
      return data.filter((element: GameData) =>
        element.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return [];
  }, [data, searchQuery]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setResultsVisible(searchQuery !== "");
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const query: string = event.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="searchBarDiv">
      <div
        className={`searchBar centered-element ${
          isResultsVisible ? "animate" : ""
        }`}
        style={
          searchQuery !== ""
            ? {
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }
            : { borderRadius: "20px" }
        }
      >
        <input
          type="text"
          placeholder="Search"
          className="searchInput"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      {searchQuery && isResultsVisible && (
        <div className="gameResults">
          {filteredGames.map((game: GameData) => (
            <div
              key={game.id}
              className="gameItem"
              onClick={() => setSearchQuery("")}
            >
              <Link to={`/games/${game.id}`}>{game.title}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
