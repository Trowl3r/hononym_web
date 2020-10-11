import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getGroupById } from "../../actions/group";
import GroupLayout from "./GroupLayout";
import GroupPostForm from "./GroupPostForm";
import GroupPosts from "./GroupPosts";

//Material Ui
import { Container } from "@material-ui/core";

const Group = ({
  getGroupById,
  group: { group },
  post: { posts },
  loading,
  auth,
  match,
}) => {
  useEffect(() => {
    getGroupById(match.params.id);
  }, [getGroupById, match.params.id]);

  return loading || group === null ? (
    <Spinner />
  ) : (
    <Container>
      {group.private ? (
        !group.members.some(
          (member) => member.user.toString() === auth.user._id
        ) ? (
          <Redirect to="/create-group" />
        ) : (
          <Fragment>
            <GroupLayout group={group} posts={posts} />
            <GroupPostForm id={match.params.id} />
          </Fragment>
        )
      ) : !group.members.some(
          (member) => member.user.toString() === auth.user._id
        ) ? (
        <GroupLayout group={group} posts={posts} />
      ) : (
        <Fragment>
          <GroupLayout group={group} posts={posts} />
          <GroupPostForm id={match.params.id} />
          <GroupPosts id={match.params.id} />
        </Fragment>
      )}
    </Container>
  );
};

Group.propTypes = {
  auth: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  getGroupById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  group: state.group,
  post: state.post,
});

export default connect(mapStateToProps, { getGroupById })(Group);
