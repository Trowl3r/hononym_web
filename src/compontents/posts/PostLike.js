import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/post";

// Material UI
import { IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const PostLike = ({ addLike, removeLike, post: { _id, likes }, auth }) => {
  const [likeCount, setLikeCount] = useState(likes.length);
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    if (likes.some((like) => like.user === auth.user._id)) {
      setUpdated(false);
    }
  }, []);

  const handleLikes = (e) => {
    e.preventDefault();

    if (updated) {
      addLike(_id);
      setLikeCount(likeCount + 1);
      setUpdated(false);
    } else {
      removeLike(_id);
      setLikeCount(likeCount - 1);
      setUpdated(true);
    }
  };

  return (
    <Fragment>
      <IconButton aria-label="Like" onClick={handleLikes}>
        <FavoriteIcon
          style={updated ? { color: "9E9E9E" } : { color: "#ff0000" }}
        />
      </IconButton>
      <Typography variant="p">
        {likeCount}
      </Typography>
    </Fragment>
  );
};

PostLike.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike })(PostLike);
