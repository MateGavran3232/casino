import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
// @ts-ignore
import Logo from "../../assets/logo.png";
// @ts-ignore
import slotSvg from "../../assets/slot-machine-winner-svgrepo-com.svg";
import "../../styles/Navbar.scss";
import Login from "../auth/Login";
import Register from "../auth/Register";
import SearchBar from "./SearchBar";
import React from "react";
import useDataStore from "../../store/useDataStore";

function Navbar(): JSX.Element {
  const { isLoginOpen, isRegisterOpen, setIsLoginOpen, setIsRegisterOpen } =
    useDataStore((state) => ({
      isLoginOpen: state.isLoginOpen,
      isRegisterOpen: state.isRegisterOpen,
      setIsLoginOpen: state.actions.setIsLoginOpen,
      setIsRegisterOpen: state.actions.setIsRegisterOpen,
    }));
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const { user, handleLogout } = useDataStore((state) => ({
    user: state.user,
    handleLogout: state.handleLogout,
  }));

  const toggleSearchBar = (): void => {
    setSearchBarVisible((prevState: boolean) => !prevState);
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="leftNav">
          <div className="allGamesDiv">
            <Link to={`/`}>
              <img className="slotSvg" src={slotSvg} alt="Slot Machine" />
            </Link>
            <Link to={`/allgames`}>
              <p className="pHover">All Slot Games</p>
            </Link>
          </div>
        </div>

        <SearchBar isVisible={isSearchBarVisible} />

        <div className="mobileMenu">
          <BiSearchAlt
            color="white"
            size="26px"
            onClick={toggleSearchBar}
            className="searchIcon"
          />

          {!user ? (
            <div className="mobileMenuContent">
              <button
                className="loginBtn"
                onClick={() => {
                  setIsLoginOpen(true);
                }}
              >
                Log In
              </button>
              <button
                className="regBtn"
                onClick={() => {
                  setIsRegisterOpen(true);
                }}
              >
                Register
              </button>
            </div>
          ) : (
            <div className="logedIn">
              <div>{`Money: ${user.money}$`}</div>
              <div>{`Hello ${user.username}`}</div>
              <button onClick={() => handleLogout()}>Log out</button>
            </div>
          )}
        </div>
      </div>
      {isLoginOpen && <Login />}
      {isRegisterOpen && <Register />}
    </div>
  );
}

export default Navbar;
