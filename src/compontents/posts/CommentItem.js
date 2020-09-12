import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import { deleteComment } from "../../actions/post";
import CommentLikes from "./CommentLikes";

const CommentItem = ({
  postId,
  comment,
  auth,
  deleteComment,
}) => (
  <Fragment>
    <Link to={`/profile/${comment.user}`}>
      <h4>{comment.name}</h4>
    </Link>
    <h4>{comment.text}</h4>
    <CommentLikes comment={comment} postId={postId} />
    {!auth.loading &&
      comment.user ===
        auth.user._id && (
          <button onClick={() => deleteComment(postId, comment._id)} type="button">
            Delete
          </button>
        )}
  </Fragment>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);