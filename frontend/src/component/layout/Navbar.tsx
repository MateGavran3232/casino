import { useState } from "react";
import { BiSearchAlt, BiMenu, BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import slotSvg from "../../assets/slot-machine-winner-svgrepo-com.svg";
import "../../styles/Navbar.scss";
import Login from "../auth/Login";
import Register from "../auth/Register";
import SearchBar from "./SearchBar";
import React from "react";

function Navbar(): JSX.Element {
  const [loginDisplay, setLoginDisplay] = useState(false);
  const [registerDisplay, setRegisterDisplay] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSearchBar = (): void => {
    setSearchBarVisible((prevState: boolean) => !prevState);
  };

  const handleMobileMenuToggle = (): void => {
    setMobileMenuOpen((prevState: boolean) => {
      document.body.classList.toggle("menuOpen", !prevState);
      document.documentElement.classList.toggle("menuOpen", !prevState);
      return !prevState;
    });
  };

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

        {isSearchBarVisible && <SearchBar />}

        <div className="registerDiv">
          <BiSearchAlt
            color="white"
            size="26px"
            onClick={toggleSearchBar}
            className="searchIcon"
            style={{ cursor: "pointer" }}
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
                  setLoginDisplay(true);
                  handleMobileMenuToggle();
                }}
              >
                Log In
              </button>
              <button
                className="regBtn"
                onClick={() => {
                  setRegisterDisplay(true);
                  handleMobileMenuToggle();
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
