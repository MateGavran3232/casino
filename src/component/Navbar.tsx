import Logo from "../assets/logo.png";
import slotSvg from "../assets/slot-machine-winner-svgrepo-com.svg";
import "../styles/Navbar.scss";
import { BiSearchAlt } from "react-icons/bi";
function Navbar() {
  return (
    <div className="container">
      <div className="navbar">
        <div className="leftNav">
          <img className="logo" src={Logo} />
          <div className="allGamesDiv">
            <img className="slotSvg" src={slotSvg} />
            <p className="pHover">All Slot Games</p>
          </div>
        </div>

        <div className="registerDiv">
          <BiSearchAlt color="white" size="26px" />
          <p className="pHover">Log In</p>
          <button className="regBtn">Register</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
