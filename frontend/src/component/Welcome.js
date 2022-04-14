// import { Grid, Typography } from "@material-ui/core";
// import Footer from "./Footer";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";

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
  return <PageNotFound />;
};

export default Welcome;
