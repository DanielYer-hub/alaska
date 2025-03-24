import { FunctionComponent, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ThemeContext, ThemeContextType } from "../context/ThemeContext";
import ColorThemeToggle from "./ColoreThemeToggle";
import "./style/Navbar.css";

interface NavbarProps {
  onSearch: (term: string) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ onSearch }) => {
  const { user, logout } = useAuth();
  const themeContext = useContext(ThemeContext) as ThemeContextType;
  const { theme } = themeContext;
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 991);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-custom theme-${theme}`}>
      <div className="container-fluid" >
        <Link className="navbar-brand" to="/">
          ALASKA
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          ☰
        </button>
        <div
          className={`collapse navbar-collapse ${isMobile && isDropdownOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/favourite-cards">
                  Favourite Cards
                </Link>
              </li>
            )}
            {user?.isBusiness  && (
              <>
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
              </>
            )}
          </ul>
          <ColorThemeToggle />
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
          {user ? (
            <button className="btn btn-danger logout-btn" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-primary login-btn" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;