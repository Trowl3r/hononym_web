import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addLike, removeLike } from "../../actions/post";

const PostLike = ({ addLike, removeLike, post: { _id, likes }, auth }) => {
  const [likeCount, setLikeCount] = useState(likes.length);
  const [updated, setUpdated] = useState(true);
  const [text, setText] = useState("Like");

  useEffect(() => {
    if(likes.some(like => like.user === auth.user._id)) {
      setText("Unlike");
      setUpdated(false);
    }
  }, []);

  const handleLikes = (e) => {
    e.preventDefault();

    if (updated) {
      addLike(_id);
      setLikeCount(likeCount + 1);
      setText("Unlike");
      setUpdated(false);
    } else {
      removeLike(_id);
      setLikeCount(likeCount - 1);
      setText("Like");
      setUpdated(true);
    }
  };

  return (
    <Fragment>
      <button onClick={handleLikes}>{text}</button>

      <h1>{likeCount}</h1>
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
