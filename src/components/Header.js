import React from "react";
import { Link } from "react-router-dom";
import "../header.css";
function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link  to='/homepage'>
              Homepage
            </Link>
          </li>
          <li>
            <Link  to='/shoes'>
              Shoes
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
