import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFollow, addFollow } from "../../actions/profile";

//Material UI
import Button from '@material-ui/core/Button';

const ProfileFollowing = ({
  profile: { user, follower },
  auth,
  removeFollow,
  addFollow,
}) => {
  const [followerCount, setFollowerCount] = useState(follower.length);
  const [updated, setUpdated] = useState(true);
  const [text, setText] = useState("Follow");


  useEffect(() => {
    if(follower.some(follow => follow.user === auth.user._id)) {
      setText("Unfollow");
      setUpdated(false);
    }
  }, []);

  const handleFollows = (e) => {
    e.preventDefault();
    if (updated) {
      addFollow(user._id);
      setFollowerCount(followerCount + 1);
      setText("Unfollow")
      setUpdated(false);
    } else {
      removeFollow(user._id);
      setFollowerCount(followerCount - 1);
      setText("Follow")
      setUpdated(true);
    }
  };

  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={handleFollows}>{text}</Button>
    </Fragment>
  );
};

ProfileFollowing.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  addFollow: PropTypes.func.isRequired,
  removeFollow: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addFollow, removeFollow })(
  ProfileFollowing
);
