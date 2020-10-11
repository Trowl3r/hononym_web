import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import GroupPostItem from "./GroupPostItem";
import CommentForm from "../posts/CommentForm";
import CommentItem from "../posts/CommentItem";
import { getPost } from "../../actions/post";
import { getGroupById } from "../../actions/group";

//Material UI
import { Container } from "@material-ui/core";

const GroupPost = ({
  getPost,
  post: { post, loading },
  match,
  group: { group },
  getGroupById,
}) => {
  useEffect(() => {
    getGroupById(match.params.group_id);
    getPost(match.params.id);
  }, [getPost, getGroupById, match.params.group_id, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Container component="main" maxWidth="sm">
        <Link to={`/group/${group._id}`}>Back to Posts</Link>
        <GroupPostItem post={post} group_id={group._id} />
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </Container>
    </Fragment>
  );
};

GroupPost.propTypes = {
  getPost: PropTypes.func.isRequired,
  getGroupById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  group: state.group,
});

export default connect(mapStateToProps, { getPost, getGroupById })(GroupPost);
