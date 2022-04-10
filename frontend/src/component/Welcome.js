import { Grid, Typography } from "@material-ui/core";
// import Footer from "./Footer";
import HomePage from "./HomePage";

const Welcome = (props) => {
  let auth = props.isAuth();
  return (
    <>
      <HomePage auth={auth} />
      {/* <Footer /> */}
    </>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
