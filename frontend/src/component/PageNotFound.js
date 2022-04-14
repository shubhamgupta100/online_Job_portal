import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
// import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon style={{ fontSize: "100px", marginLeft: "70px" }} />

      <h1
        style={{
          fontWeight: "bolder",
          //   marginBottom: "20px",
          //   marginLeft: "-40px",
        }}
      >
        Page Not Found{" "}
      </h1>
      <Link to="/">
        <button
          className="profile_update_button"
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
