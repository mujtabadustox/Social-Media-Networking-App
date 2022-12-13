import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

// functions
import { logout } from "../api/user";

const Navbar = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = (e) => {
    e.preventDefault();

    logout()
      .then((res) => {
        toast.success(res.message);
        // set user to null
        setUser(null);
        // redirect the user to login
        history.push("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto ">
            <li className="nav-item active">
              <Link className="nav-link" to="/signup">
                Profile
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/signup">
                Find Friends
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orgsignup">
                Events by Hobbies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orglogin">
                Search Event
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/orghome">
                Friends
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
