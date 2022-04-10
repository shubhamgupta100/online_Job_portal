import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";
const Navbar = () => {
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light  shadow-sm"
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: 50,
        paddingRight: 50,
      }}
    >
      <div class="logo mt-1">
        <Link class="navbar-brand " to="/">
          <h3 style={{ fontWeight: "bolder" }}>Online Job Portal</h3>
        </Link>
      </div>
      <div class="other mt-1">
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <ul class="navbar-nav">
                {/* <li class="nav-item">
                  <Link class="nav-link" style={{ color: "black" }} to="/home">
                    <h5>Home</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li> */}
                <li class="nav-item" style={{ paddingTop: "8px" }}>
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/addjob"
                  >
                    <h5>Add Jobs</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="nav-item" style={{ paddingTop: "8px" }}>
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/myjobs"
                  >
                    <h5>My Jobs</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="nav-item" style={{ paddingTop: "8px" }}>
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/employees"
                  >
                    <h5>Employees</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="nav-item" style={{ paddingTop: "8px" }}>
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/profile"
                  >
                    <h5>Profile</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/logout"
                  >
                    <button>Logout</button>
                  </Link>
                </li>
              </ul>
            </>
          ) : (
            <>
              <ul>
                <li class="nav-item">
                  <Link class="nav-link" style={{ color: "black" }} to="/home">
                    <h5>Home</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/applications"
                  >
                    <h5>Applications</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/profile"
                  >
                    <h5>Profile</h5>
                    <span class="sr-only">(current)</span>
                  </Link>
                </li>

                <li class="nav-item">
                  <Link
                    class="nav-link"
                    style={{ color: "black" }}
                    to="/logout"
                  >
                    <button>Logout</button>
                  </Link>
                </li>
              </ul>
            </>
          )
        ) : (
          <>
            <ul>
              <li class="nav-item">
                <Link class="nav-link" style={{ color: "black" }} to="/login">
                  <button>Login</button>
                  {/* <h5>Login</h5> */}
                  <span class="sr-only">(current)</span>
                </Link>
              </li>

              <li class="nav-item">
                <Link class="nav-link" style={{ color: "black" }} to="/signup">
                  <button>SignUp</button>
                  {/* <h5>SignUp</h5> */}
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
