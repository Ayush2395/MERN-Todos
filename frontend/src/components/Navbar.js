import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const { user } = useAuth();
  const { logout } = useLogout();
  return (
    <>
      <header>
        <div className="navbar main">
          <button className="burger" onClick={() => setShow(!show)}>
            <div className="toggler_icon bar_1"></div>
            <div className="toggler_icon bar_2"></div>
            <div className="toggler_icon bar_3"></div>
          </button>
          <ul className={`nav_menu ${show ? "nav_menu_open" : null}`}>
            <li className="nav_item">
              <Link to="/" className="nav_link">
                Home
              </Link>
            </li>
            {user && (
              <li className="nav_item">
                <button className="nav_link" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
            {!user && (
              <li className="nav_item">
                <Link to="/login" className="nav_link">
                  Login
                </Link>
              </li>
            )}
            {!user && (
              <li className="nav_item">
                <Link to="/signup" className="nav_link">
                  Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
