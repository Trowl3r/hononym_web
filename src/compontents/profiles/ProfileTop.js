import React from "react";
import PropTypes from "prop-types";

const ProfileTop = ({
  profile: {
    name,
    website,
    bio,
    user: { username },
  },
}) => {
  return (
    <div>
      {name}, {website}, {bio}, {username}
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
