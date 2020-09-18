import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
//import {deletePost} from "../../actions/post";
import PostLike from "./PostLike";

//Material UI
import {
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const PostItem = ({ post, auth }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              src={`http://localhost:5000/${post.profileImage}`}
              alt={post.username}
              className={classes.large}
            />
          }
          title={post.name}
          titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
          subheaderTypographyProps={{ variant: "p" }}
          subheader={`@${post.username}`}
        />
        <CardContent>
          <Typography variant="p" color="textPrimary">
            {post.text}
          </Typography>
        </CardContent>
        <CardActions>
          <PostLike post={post}/>
        </CardActions>
      </Card>
    </Fragment>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(PostItem);
