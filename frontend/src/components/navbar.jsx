import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logoBox">
        <img src={logo} alt="CineMind Logo" className="logo" />
      </div>
      <div className="mainnav">
        <Link to="/" className="sideLink">
          <div>
            <p>Home</p>
          </div>
        </Link>
        <a href="#features">Features</a>
        <Link to="/dashboard">My Projects</Link>
        <a href="#about">About</a>
      </div>
    </nav>
  );
}

export default Navbar;
