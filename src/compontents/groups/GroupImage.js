import React, { Fragment, useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { changeGroupImage, getGroupById } from "./../../actions/group";
import { Redirect } from "react-router-dom";
import Spinner from "../layout/Spinner";
import { Container } from "@material-ui/core";
const GroupImage = ({
  getGroupById,
  changeGroupImage,
  group: { group, loading },
  auth,
  match,
}) => {
  useEffect(() => {
    getGroupById(match.params.id);
  }, [getGroupById, match.params.id]);

  const [file, setFile] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    changeGroupImage(formData, match.params.id);
  };

  return loading || group === null ? (
    <Spinner />
  ) : (
    <Container>
      {!group.admins.some((admin) => admin.user.toString() === auth.user._id) ? (
        <Redirect to={`/group/${match.params.id}`} />
      ) : (
        <Fragment>
          <form onSubmit={onSubmit}>
            <input type="file" id="uploadImage" onChange={onChange} />
            <input type="submit" value="Upload" />
          </form>
        </Fragment>
      )}
    </Container>
  );
};

GroupImage.propTypes = {
  changeGroupImage: PropTypes.func.isRequired,
  group: PropTypes.object.isRequired,
  getGroupById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  group: state.group,
  auth: state.auth,
});

export default connect(mapStateToProps, { changeGroupImage, getGroupById })(
  GroupImage
);