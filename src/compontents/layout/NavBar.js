import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//Material UI
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
  align: {
    flexGrow: 1,
  },
}));

const NavBar = ({ auth, logout }) => {
  const classes = useStyles();

  const setTheme = () => {
    localStorage.getItem("theme") === "light" ||
    localStorage.getItem("theme") === null
      ? localStorage.setItem("theme", "dark")
      : localStorage.setItem("theme", "light");
    window.location.reload();
  };

  const authLinks = (
    <Fragment>
      <Button color="inherit" href="/profile/me">
        My Profile
      </Button>
      <Button color="inherit" href="/profiles">
        Profiles
      </Button>
      <Button color="inherit" href="/posts">
        Posts
      </Button>
      <Button color="inherit" href="/groups">
        Groups
      </Button>
      <Button onClick={logout} color="inherit" href="/login">
        Logout
      </Button>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Button color="inherit" href="/profiles">
        Profiles
      </Button>
      <Button color="inherit" href="/register">
        Register
      </Button>
      <Button color="inherit" href="/login">
        Login
      </Button>
    </Fragment>
  );

  return (
    <AppBar>
      <Toolbar>
        <Button variant="h6" color="inherit" href="/">
          Hononym
        </Button>

        <div className={classes.align}></div>
        {!auth.loading && (
          <Fragment>{auth.isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
        <Button variant="h6" color="inherit" onClick={setTheme}>
          Theme
        </Button>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
