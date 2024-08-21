import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <nav className="navIcons">
        <li id="calendarIcon" className="navIcon">
          <Link to="/" className="navLinks">
            <p>Calendar</p>
          </Link>
        </li>

        <li id="plansIcon" className="navIcon">
          <Link to="/plans" className="navLinks">
            <p>Plans</p>
          </Link>
        </li>

        <li id="AccountIcon" className="navIcon">
          <Link to="/account" className="navLinks">
            <p>Account</p>
          </Link>
        </li>
      </nav>
    </div>
  );
}
