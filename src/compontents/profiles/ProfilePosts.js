import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getProfilePostsById } from "../../actions/post";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";

const ProfilePost = ({ getProfilePostsById, post: { posts }, id }) => {
  useEffect(() => {
    getProfilePostsById(id);
  }, [getProfilePostsById]);

  return (
    <Fragment>
      {posts.map((post) => (
        <Link style={{ textDecoration: "none" }} to={`/post/${post._id}`}>
          <PostItem key={post._id} post={post} />
        </Link>
      ))}
    </Fragment>
  );
};

ProfilePost.propTypes = {
  getProfilePostsById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getProfilePostsById })(ProfilePost);
