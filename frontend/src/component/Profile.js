import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  // Typography,
  // Modal,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import Loading from "./Loading";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid item container className={classes.inputBox} key={key}>
          <Grid item xs={6}>
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item style={{ alignSelf: "center" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  // const [userData, setUserData] = useState();
  // const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setProfileDetails(response.data);
        if (response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        }
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

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const editDetails = () => {
  //   setOpen(true);
  // };

  const handleUpdate = () => {
    // console.log(education);

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        // console.log(err.response);
      });
    // setOpen(false);
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
          style={{ padding: "0 30px", minHeight: "93vh" }}
        >
          <Grid item>
            <h1
              className="border_bottom"
              style={{ fontWeight: "bolder", marginTop: "-30px" }}
            >
              Profile
            </h1>
          </Grid>
          <Grid item xs>
            <Paper
              style={{
                padding: "25px 30px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
                border: "1px solid rgb(224, 222, 222)",
              }}
              elevation={1}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <TextField
                    label="Name"
                    value={profileDetails.name}
                    onChange={(event) =>
                      handleInput("name", event.target.value)
                    }
                    className={classes.inputBox}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <MultifieldInput
                  education={education}
                  setEducation={setEducation}
                />
                <Grid item>
                  <ChipInput
                    className={classes.inputBox}
                    label="Skills"
                    variant="outlined"
                    helperText="Press enter to add skills"
                    value={profileDetails.skills}
                    onAdd={(chip) =>
                      setProfileDetails({
                        ...profileDetails,
                        skills: [...profileDetails.skills, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skills = profileDetails.skills;
                      skills.splice(index, 1);
                      setProfileDetails({
                        ...profileDetails,
                        skills: skills,
                      });
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <FileUploadInput
                    className={classes.inputBox}
                    label="Resume (.pdf)"
                    icon={<DescriptionIcon />}
                    uploadTo={apiList.uploadResume}
                    handleInput={handleInput}
                    identifier={"resume"}
                    accept="application/pdf"
                  />
                </Grid>
                <Grid item>
                  <FileUploadInput
                    className={classes.inputBox}
                    label="Profile Photo (.jpg/.png)"
                    icon={<FaceIcon />}
                    uploadTo={apiList.uploadProfileImage}
                    handleInput={handleInput}
                    identifier={"profile"}
                    accept="image/*"
                  />
                </Grid>
              </Grid>
              <button
                className="profile_update_button"
                style={{
                  marginTop: "20px",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                }}
                onClick={() => handleUpdate()}
              >
                Update Details
              </button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Profile;
