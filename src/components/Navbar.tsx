import { FunctionComponent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext, ThemeContextType } from "../context/ThemeContext";
import "./style/Navbar.css";
import ColorThemeToggle from "./ColoreThemeToggle";

interface NavbarProps {
  onSearch: (term: string) => void;
}
const Navbar: FunctionComponent<NavbarProps> = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const themeContext = useContext(ThemeContext) as ThemeContextType;
  const { theme } = themeContext;
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };
  const renderSearchForm = (
    <form className="d-flex search-form" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="btn btn-outline-success" type="button">
        Search
      </button>
    </form>
  );

  const navForUser = (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ALASKA
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favourite-cards">
                Favourite Cards
              </Link>
            </li>
          </ul>
          <ColorThemeToggle />
          {renderSearchForm}
          <div className="user-auth">
            <button className="btn btn-danger logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

  const navForGuest = (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ALASKA
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            </ul>
        <ColorThemeToggle />
        {renderSearchForm}
        <Link className="btn btn-primary login-btn" to="/login">
          Login
        </Link>
        </div>
      </div>
    </nav>
  );
  
  const navForBusiness = (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          ALASKA
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favourite-cards">
                Favourite Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mycard">
                My Cards
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/newcard">
                Create Card
              </Link>
            </li>
          </ul>
          <ColorThemeToggle />
          {renderSearchForm}
          <button className="btn btn-danger logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
  return (
    <div>{!user ? navForGuest : user.isBusiness ? navForBusiness : navForUser}</div>
  );
};
export default Navbar;