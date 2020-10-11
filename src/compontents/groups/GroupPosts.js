import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getGroupPosts } from "../../actions/post";
import PropTypes from "prop-types";
import GroupPostItem from "./GroupPostItem";
import { Link } from "react-router-dom";

const GroupPosts = ({ getGroupPosts, post: { posts }, id }) => {
  useEffect(() => {
    getGroupPosts(id);
  }, [getGroupPosts]);

  return (
    <Fragment>
      {posts.map((post) => (
        <GroupPostItem key={post._id} post={post} group_id={id} />
      ))}
    </Fragment>
  );
};

GroupPosts.propTypes = {
  getGroupPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getGroupPosts })(GroupPosts);
