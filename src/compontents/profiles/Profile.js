import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileFollowing from "./ProfileFollowing";
import ProfilePost from "./ProfilePosts";

//Material UI
import {
  Avatar,
  CardHeader,
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  linkColor: {
    color: "#9E9E9E",
    textDecoration: "none",
  },
  linkColorName: {},
  action: {
    alignSelf: "center",
  },
  cardClass: {
    borderRadius: "0px",
  },
}));

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  const classes = useStyles();

  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Container component="main" maxWidth="md">
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    src={`http://localhost:5000/${profile.profileImage}`}
                    alt={profile.name}
                    className={classes.large}
                  />
                }
                action={
                  auth.user._id !== profile.user._id ? (
                    <ProfileFollowing profile={profile} />
                  ) : null
                }
                classes={{ action: classes.action }}
                titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
                title={profile.name}
                subheaderTypographyProps={{ variant: "p" }}
                subheader={`@${profile.user.username}`}
              />
              <Divider />
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Bio
                </Typography>
                <Typography variant="p" color="textPrimary">
                  {profile.bio}
                </Typography>
              </CardContent>
              <Divider />

              <ProfilePost id={profile.user._id} />
            </Card>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
