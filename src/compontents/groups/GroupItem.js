import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const GroupItem = ({group: {name, desc, members, follower, posts, _id, groupImage}}) => {
    return (
        <div>
            <img src={`http://localhost:5000/${groupImage}`} />
            <h2>{name}</h2>
            <h2>{desc}</h2>
            <h2>Members: {members.length}</h2>
            <h2>follwer: {follower.length}</h2>
            <h2>posts: {posts.length}</h2>
            <Link to={`/group/${_id}`} >View Group</Link>
        </div>
    )
};

GroupItem.propTypes = {
    group: PropTypes.object.isRequired,
}

export default GroupItem;
