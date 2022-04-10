import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MakeCard({ name, title, imgLink, content }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      className={classes.root}
      style={{ width: "500px", margin: "10px", borderRadius: "20px" }}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <h6>
            <b style={{ fontSize: "18px" }}>{name}</b>
            <i> {title} </i>
          </h6>
          <p>{content} </p>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={imgLink}
        title={title}
        style={{ width: "600px" }}
      />
    </Card>
  );
}
