import { useState, useEffect, useContext } from "react";
import {
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Avatar,
} from "@material-ui/core";
import Loading from "../Loading";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

import { SetPopupContext } from "../../App";
import apiList, { server } from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const UserTitle = (props) => {
  const classes = useStyles();
  const { user } = props;
  //   console.log("user", user);
  const setPopup = useContext(SetPopupContext);
  const getResume = () => {
    if (user.resume && user.resume !== "") {
      //   const address = `${server}${user.resume}`;
      const address = `${user.resume}`;
      // console.log(address);
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        })
        .catch((error) => {
          // console.log(error);
          setPopup({
            open: true,
            severity: "error",
            message: "Error",
          });
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No resume found",
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        margin: "auto",
        paddingLeft: "30px",
      }}
    >
      <Paper
        style={{
          padding: "20px",
          outline: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "10px",
          border: "1px solid rgb(224, 222, 222)",
          marginBottom: "20px",
          //   paddingLeft: "30px",
          width: "900px",
        }}
        elevation={1}
      >
        <Grid container>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <Avatar
              //   src={`${server}${user.profile}`}
              src={`${user.profile}`}
              className={classes.avatar}
              style={{
                height: "130px",
                // width: "1500x",
                width: "110px",
                // marginLeft: "-100px",
                // marginRight: "30px",
              }}
            />
          </Grid>
          <Grid
            container
            item
            xs={8}
            spacing={0}
            direction="column"
            style={{ marginLeft: "20px" }}
          >
            <div className="recruiter_title_section">
              <div>
                <span>Name: {user.name}</span>
              </div>
              <div>
                <b>{user.email}</b>
              </div>
              <div>
                <Rating
                  value={user.rating !== -1 ? user.rating : null}
                  readOnly
                />
              </div>
            </div>
            <div className="recruiter_job_type">
              <div>
                Education:{" "}
                {user.education
                  .map((edu) => {
                    return `${edu.institutionName} (${edu.startYear}-${
                      edu.endYear ? edu.endYear : "Ongoing"
                    })`;
                  })
                  .join(", ")}
              </div>
            </div>
            <div>
              <div style={{ marginTop: "8px" }}>
                {user.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    style={{
                      marginRight: "2px",
                      fontWeight: "bolder",
                      fontFamily: "Ovo",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="emp_btn_container" style={{ margin: "5px" }}>
              <div>
                <button className="resume_download" onClick={() => getResume()}>
                  Download Resume
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

const User = (props) => {
  const [users, setUsers] = useState([]);
  //   const [filterOpen, setFilterOpen] = useState(false);
  const [skill, setSkill] = useState("");
  const [loading, setLoading] = useState(true);
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let address = apiList.users;
    if (skill !== "") {
      address = `${address}?skill=${skill}`;
    }
    // console.log("address", address);

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.users);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="main_user_conatiner">
          <div>
            <div
              className="searchJob"
              style={{ marginBottom: "20px", marginLeft: "40px" }}
            >
              <TextField
                label="Search Jobs with skills"
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    getData();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton onClick={() => getData()}>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                style={{ width: "600px", marginLeft: "10px" }}
                variant="outlined"
              />
            </div>

            <div className="job-container">
              {users.length > 0 ? (
                users.map((user) => {
                  return <UserTitle key={user._id} user={user} />;
                })
              ) : (
                <div className="sorry_line" style={{ marginLeft: "100px" }}>
                  <h2>Oops ! No User Exists:) </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default User;
