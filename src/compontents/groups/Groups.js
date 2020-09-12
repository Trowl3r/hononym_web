import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Spinner from "../layout/Spinner";
import GroupItem from "./GroupItem";
import { getGroups } from "./../../actions/group";

const Groups = ({ getGroups, group: { groups, loading } }) => {
  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {groups.length > 0 ? (
            groups.map((group) => <GroupItem key={group._id} group={group} />)
          ) : (
            <h4>No Groups found</h4>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Groups.propTypes = {
  getGroups: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
});

export default connect(mapStateToProps, { getGroups })(Groups);
