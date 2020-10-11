import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteGroupPost } from "../../actions/post";
import PostLike from "../posts/PostLike";
import { Link } from "react-router-dom";

//Material UI
import {
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    marginTop: theme.spacing(3),
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  linkStyling: {
    textDecoration: "none",
  },
}));

const GroupPostItem = ({ post, auth, deleteGroupPost, group_id }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Card className={classes.cardStyle}>
        <Link style={{ textDecoration: "none" }} to={`/group/post/${post._id}`}>
          <CardHeader
            avatar={
              <Avatar
                src={`http://localhost:5000/${post.profileImage}`}
                alt={post.username}
                className={classes.large}
              />
            }
            title={
              <Link to={`/profile/${post.user}`}>
                <Typography
                  variant="inherit"
                  className={classes.linkStyling}
                  color="textPrimary"
                >{`${post.name}`}</Typography>
              </Link>
            }
            titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
            subheaderTypographyProps={{ variant: "a" }}
            subheader={
              <Link to={`/profile/${post.user}`}>
                <Typography
                  variant="inherit"
                  className={classes.linkStyling}
                  color="textPrimary"
                >{`@${post.username}`}</Typography>
              </Link>
            }
          />
          <CardContent>
            <Typography variant="p" color="textPrimary">
              {post.text}
            </Typography>
          </CardContent>
        </Link>
        <CardActions>
          <PostLike post={post} />
          {!auth.loading && post.user === auth.user._id && (
            <Button onClick={() => deleteGroupPost(group_id, post._id)}>Delete</Button>
          )}
        </CardActions>
      </Card>
    </Fragment>
  );
};

GroupPostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteGroupPost: PropTypes.func.isRequired,
  group_id: PropTypes.any.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { deleteGroupPost })(
  GroupPostItem
);
