import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  // IconButton,
  // InputAdornment,
  makeStyles,
  Paper,
  // TextField,
  Typography,
  Modal,
  // Slider,
  // FormControlLabel,
  // FormGroup,
  // MenuItem,
  // Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
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

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(application.job.rating);

  const appliedOn = new Date(application.dateOfApplication);
  const joinedOn = new Date(application.dateOfJoining);

  const fetchRating = () => {
    axios
      .get(`${apiList.rating}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRating(response.data.rating);
        // console.log(response.data);
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // console.log(response.data);
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        fetchRating();
        setOpen(false);
      })
      .catch((err) => {
        // console.log(err.response);
        // console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        fetchRating();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const colorSet = {
  //   applied: "#3454D1",
  //   shortlisted: "#DC851F",
  //   accepted: "#09BC8A",
  //   rejected: "#D1345B",
  //   deleted: "#B49A67",
  //   cancelled: "#FF8484",
  //   finished: "#4EA5D9",
  // };

  return (
    // <div className="dashboard_container">
    <div className="dashboard">
      <Paper className="card" elevation={1}>
        <div className="dashboard-container">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontWeight: "bold", color: "#0d6efd" }}>
                Company Name: {application.recruiter.companyName}
              </h3>
            </div>
            <div>
              <h4 style={{ fontWeight: "bold" }}>{application.job.title}</h4>
            </div>
          </div>
          <div className="recruiter">
            <div>Posted By: {application.recruiter.name}</div>
            <div>Role : {application.job.jobType}</div>
          </div>
          <div className="salary">
            <div>Salary :{application.job.salary}</div>
            <div>
              Duration :{" "}
              {application.job.duration !== 0
                ? `${application.job.duration} month`
                : `Flexible`}
            </div>
          </div>
          <div className="dashboard_skills">
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </div>
          <div className="applied">
            <div item>Applied On: {appliedOn.toLocaleDateString()}</div>
            {application.status === "accepted" ||
            application.status === "finished" ? (
              <div item>Joined On: {joinedOn.toLocaleDateString()}</div>
            ) : null}
          </div>

          <div className="btn_container">
            <div className="btngroup">
              <button className="btn">{application.status}</button>
            </div>
            {application.status === "accepted" ||
            application.status === "finished" ? (
              <div>
                <button
                  className="btn_blue"
                  onClick={() => {
                    fetchRating();
                    setOpen(true);
                  }}
                >
                  Rate Job
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.popupDialog}
        >
          <Paper
            style={{
              padding: "20px",
              outline: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              minWidth: "30%",
              alignItems: "center",
            }}
          >
            <Rating
              name="simple-controlled"
              style={{ marginBottom: "30px" }}
              value={rating === -1 ? null : rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "10px 50px" }}
              onClick={() => changeRating()}
            >
              Submit
            </Button>
          </Paper>
        </Modal>
      </Paper>
    </div>
    // </div>
  );
};

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setApplications(response.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err.response);
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
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          style={{ padding: "30px", minHeight: "93vh" }}
        >
          <Grid item>
            <h2
              className="border_bottom"
              style={{ fontWeight: "bolder", marginTop: "-30px" }}
            >
              Applications
            </h2>
          </Grid>
          <Grid
            container
            item
            xs
            direction="column"
            style={{ width: "100%" }}
            alignItems="stretch"
            justify="center"
          >
            {applications.length > 0 ? (
              applications.map((obj) => (
                // <Grid item>
                <div className="dashboard_container">
                  <ApplicationTile application={obj} />
                </div>
                // </Grid>
              ))
            ) : (
              <Typography variant="h5" style={{ textAlign: "center" }}>
                No Applications Found ! Kindly check on browse section apply
                internship/fulltime role :)
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Applications;
