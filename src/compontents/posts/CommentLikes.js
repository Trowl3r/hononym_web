import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { likeComment, unlikeComment } from "../../actions/post";

//Material UI
import { IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";

const CommentLikes = ({
  postId,
  comment,
  auth,
  likeComment,
  unlikeComment,
}) => {
  const [likeCount, setLikeCount] = useState(comment.likes.length);
  const [updated, setUpdated] = useState(true);
  const [text, setText] = useState("Like");

  useEffect(() => {
    if (comment.likes.some((like) => like.user === auth.user._id)) {
      setText("Unlike");
      setUpdated(false);
    }
  }, []);

  const handleLikes = (e) => {
    e.preventDefault();

    if (updated) {
      likeComment(postId, comment._id);
      setLikeCount(likeCount + 1);
      setText("Unlike");
      setUpdated(false);
    } else {
      unlikeComment(postId, comment._id);
      setLikeCount(likeCount - 1);
      setText("Like");
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
      <Typography variant="p">{likeCount}</Typography>
    </Fragment>
  );
};

CommentLikes.propTypes = {
  likeComment: PropTypes.func.isRequired,
  unlikeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likeComment, unlikeComment })(
  CommentLikes
);
