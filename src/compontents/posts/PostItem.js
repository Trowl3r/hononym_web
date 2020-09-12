import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//import {deletePost} from "../../actions/post";
import PostLike from "./PostLike";

const PostItem = ({ post, auth }) => {
  return (
    <Fragment>
      <Link to={`/profile/${post.user}`} />
      <h4>{post.username}</h4>
      <p>{post.text}</p>
      <Link to={`/post/${post._id}`} className="btn btn-primary">
        Go to Post
        {post.comments.length > 0 && (
          <span className="comment-count">{post.comments.length}</span>
        )}
      </Link>

      <PostLike post={post} />
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
