// import { Grid, Typography } from "@material-ui/core";
// import Footer from "./Footer";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";

const Welcome = (props) => {
  let auth = props.isAuth();
  let uType = props.userType();
  return (
    <>
      <HomePage auth={auth} userType={uType} />
      {/* <Footer /> */}
    </>
  );
};

export const ErrorPage = (props) => {
  return <PageNotFound />;
};

export default Welcome;
