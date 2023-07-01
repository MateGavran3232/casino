import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.png";
import slotSvg from "../assets/slot-machine-winner-svgrepo-com.svg";
import "../styles/Navbar.scss";
import { BiSearchAlt, BiMenu, BiX } from "react-icons/bi";
import { useData } from "../hooks/useData";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

interface Game {
  id: number;
  title: string;
  image: string;
  description: string;
  publisher: string;
}

function Navbar(): JSX.Element {
  const [loginDisplay, setLoginDisplay] = useState<boolean>(false);
  const [registerDisplay, setRegisterDisplay] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const [isSearchBarVisible, setSearchBarVisible] = useState<boolean>(false);
  const [isResultsVisible, setResultsVisible] = useState<boolean>(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { data } = useData();

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const query: string = event.target.value;
    setSearchQuery(query);
    searchGames(query);
    setResultsVisible(query !== "");
  };

  function searchGames(query: string): void {
    if (Array.isArray(data)) {
      const filteredGames: Game[] = data.filter((element: Game) =>
        element.title.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredGames(filteredGames);
    }
  }

  const toggleSearchBar = (): void => {
    setSearchBarVisible((prevState: boolean) => !prevState);
    setSearchQuery("");
    setResultsVisible(false);
  };

  const handleMobileMenuToggle = (): void => {
    setMobileMenuOpen((prevState: boolean) => {
      if (!prevState) {
        document.body.classList.add("menuOpen");
        document.documentElement.classList.add("menuOpen");
      } else {
        document.body.classList.remove("menuOpen");
        document.documentElement.classList.remove("menuOpen");
      }
      return !prevState;
    });
  };
  useEffect(() => {
    const handleScroll = (): void => {
      if (!isMobileMenuOpen) {
        document.body.classList.remove("menuOpen");
        document.documentElement.classList.remove("menuOpen");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="container">
      <div className="navbar">
        <div className="leftNav">
          <Link to={`/`}>
            <img className="logo" src={Logo} alt="Logo" />
          </Link>

          <div className="allGamesDiv">
            <img className="slotSvg" src={slotSvg} alt="Slot Machine" />
            <Link to={`/allgames`}>
              <p className="pHover">All Slot Games</p>
            </Link>
          </div>
        </div>

        <div className="searchBarDiv">
          {isSearchBarVisible && (
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
                  : {
                      borderRadius: "20px",
                    }
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
          )}

          {searchQuery && isResultsVisible && (
            <div className="gameResults">
              {filteredGames.map((game: Game) => (
                <div key={game.id} className="gameItem">
                  <Link to={`/games/${game.id}`}>{game.title}</Link>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="registerDiv">
          <BiSearchAlt
            color="white"
            size="26px"
            onClick={toggleSearchBar}
            className="searchIcon"
          />
          <button
            className="pHover"
            onClick={() => {
              setLoginDisplay(true);
            }}
          >
            Log In
          </button>
          <button className="regBtn" onClick={() => setRegisterDisplay(true)}>
            Register
          </button>
        </div>

        <div className={`mobileMenu ${isMobileMenuOpen ? "active" : ""}`}>
          <BiSearchAlt
            color="white"
            size="26px"
            onClick={toggleSearchBar}
            className="searchIcon"
          />
          {isMobileMenuOpen ? (
            <BiX
              color="white"
              size="26px"
              onClick={handleMobileMenuToggle}
              className="menuIcon"
            />
          ) : (
            <BiMenu
              color="white"
              size="26px"
              onClick={handleMobileMenuToggle}
              className="menuIcon"
            />
          )}

          {isMobileMenuOpen && (
            <div className="mobileMenuContent">
              <button
                className="loginBtn"
                onClick={() => {
                  setLoginDisplay(true), handleMobileMenuToggle();
                }}
              >
                Log In
              </button>
              <button
                className="regBtn"
                onClick={() => {
                  setRegisterDisplay(true), handleMobileMenuToggle();
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {loginDisplay && <Login setLoginDisplay={setLoginDisplay} />}
      {registerDisplay && <Register setRegisterDisplay={setRegisterDisplay} />}
    </div>
  );
}

export default Navbar;
