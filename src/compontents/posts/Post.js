import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../../actions/post";

//Material UI 
import { Container } from "@material-ui/core";


const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container component="main" maxWidth="sm">
      <Link to="/posts">Back to Posts</Link>
      <PostItem post={post} />
      <CommentForm postId={post._id} />
      {post.comments.map(comment => (
        <CommentItem key={comment._id} comment={comment} postId={post._id} />
      ))}
      </Container>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
