import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { GameData } from "../../types";
import useDataStore from "../../store/useDataStore";

function SearchBar(): JSX.Element {
  const { searchData, fetchSearch } = useDataStore((state) => ({
    searchData: state.searchData,
    fetchSearch: state.fetchSearch,
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
      fetchSearch(searchQuery);
      setResultsVisible(searchQuery !== "");
    }, 300);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery, fetchSearch]);

  return (
    <div className="searchBarDiv">
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
