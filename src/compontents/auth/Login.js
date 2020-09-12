import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

// Materual UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

//Style for classes
const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Login = ({ login, isAuthenticated }) => {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = FormData;

  const onChange = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const classes = useStyles();

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return  <Container component="main" maxWidth="sm">
  <form className={classes.form} onSubmit={onSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          placeholder="Email Address"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={onChange}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox value="allowExtraEmails" color="secondary" />}
          label="Remember me"
        />
      </Grid>
    </Grid>
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Sign In
    </Button>
    <Grid container justify="flex-end">
      <Grid item>
        <Link to="/register" variant="body2">
        Don't have an Account yet? Sign up
        </Link>
      </Grid>
    </Grid>
  </form>
</Container>;
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
