import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

//material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

//Style for Classes
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ProfileForm = ({
  profile: { loading, profile },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({ bio: "", website: "", name: "" });

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...formData };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
    }
  }, [loading, getCurrentProfile, profile, formData]);

  const { bio, website, name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, profile ? true : false);
  };

  const classes = useStyles()

  return <Container component="main" maxWidth="sm">
     <form className={classes.form} onSubmit={onSubmit}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          required
          fullWidth
          placeholder="Name"
          name="name"
          type="name"
          value={name}
          onChange={onChange}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="website"
          placeholder="website"
          type="website"
          value={website}
          onChange={onChange}
          color="secondary"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          fullWidth
          name="bio"
          placeholder="bio"
          type="bio"
          value={bio}
          onChange={onChange}
          color="secondary"
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
      Confirm
    </Button>
  </form>
  </Container>;
};

ProfileForm.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);
