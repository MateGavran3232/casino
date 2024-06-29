import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { GameData } from "../../types";
import useDataStore from "../../store/useDataStore";

type SearchBarProps = {
  isVisible: boolean;
};

function SearchBar({ isVisible }: SearchBarProps): JSX.Element {
  const { searchData, fetchData } = useDataStore((state) => ({
    searchData: state.searchData,
    fetchData: state.fetchData,
  }));

  const [searchQuery, setSearchQuery] = useState("");
  const [isResultsVisible, setResultsVisible] = useState(false);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const query: string = event.target.value;
    setSearchQuery(query);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchData.search(searchQuery);
      setResultsVisible(searchQuery !== "");
    }, 300);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery, fetchData.search]);

  return (
    <div
      className="searchBarDiv"
      style={{
        translate: isVisible ? "0rem -3rem" : "0rem 0rem",
        transition: "translate 0.25s linear",
      }}
    >
      <div className={`searchBar centered-element `}>
        <input
          type="text"
          placeholder="Search"
          className="searchInput"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div
        className="gameResults"
        style={{
          position: "absolute",
          height: searchQuery && isResultsVisible ? "300px" : 0,
          overflow: searchQuery && isResultsVisible ? "auto" : "hidden",
          paddingBottom: searchQuery && isResultsVisible ? "10px" : 0,
          paddingTop: searchQuery && isResultsVisible ? "10px" : 0,
          top: "2.5rem",
        }}
      >
        {searchData.map((game: GameData) => (
          <div
            key={game.id}
            className="gameItem"
            onClick={() => setSearchQuery("")}
          >
            <Link to={`/games/${game.id}`}>{game.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
