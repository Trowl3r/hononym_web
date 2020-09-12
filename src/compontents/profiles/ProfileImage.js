import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { profileImage } from "./../../actions/profile";


const ProfileImage = ({ profileImage }) => {
  const [file, setFile] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    profileImage(formData);
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input type="file" id="uploadImage" onChange={onChange} />
        <input type="submit" value="Upload" />
      </form>
    </Fragment>
  );
};

ProfileImage.propTypes = {
  profileImage: PropTypes.func.isRequired,
};

export default connect(null, { profileImage })(ProfileImage);
