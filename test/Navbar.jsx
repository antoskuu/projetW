import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import Auth from "../contexts/Auth";
import { logout } from "../services/AuthApi";

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Auth);

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <span className="navbar-brand">Ben Open</span>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Accueil
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts">
              Posts
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          { (!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Se connecter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  S'enregistrer
                </NavLink>
              </li>
            </>
          )) || (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/account">
                  Mon compte
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
