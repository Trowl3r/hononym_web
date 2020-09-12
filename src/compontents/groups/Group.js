import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getGroupById } from "../../actions/group";

//Material Ui
import { Container } from "@material-ui/core";

const Group = ({ getGroupById, group: { group }, loading, auth, match }) => {
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
          {" "}
          <h1>{group.name}</h1>
          <p>{group.desc}</p>
          <p>{group.members.length}</p>
        </Fragment>
        )
      ) : (
        <Fragment>
        {" "}
        <h1>{group.name}</h1>
        <p>{group.desc}</p>
        <p>{group.members.length}</p>
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
});

export default connect(mapStateToProps, { getGroupById })(Group);
