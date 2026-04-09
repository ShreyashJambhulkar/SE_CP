import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiHeart, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { roleDashboardPath } from "../utils/roleHelpers";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link className="brand" to="/">
          <FiHeart />
          <span>HopeBridge NGO</span>
        </Link>
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          {user && <NavLink to={roleDashboardPath[user.role]}>Dashboard</NavLink>}
        </nav>
        <div className="nav-actions">
          {!user ? (
            <>
              <Link className="btn ghost" to="/login">
                Login
              </Link>
              <Link className="btn" to="/register">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="chip">
                <FiUser /> {user.name}
              </span>
              <button className="btn ghost" type="button" onClick={handleLogout}>
                <FiLogOut /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
