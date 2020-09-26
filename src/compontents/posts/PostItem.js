import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
//import {deletePost} from "../../actions/post";
import PostLike from "./PostLike";
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

const PostItem = ({ post, auth }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Card className={classes.cardStyle}>
        <CardHeader
          avatar={
            <Avatar
              src={`http://localhost:5000/${post.profileImage}`}
              alt={post.username}
              className={classes.large}
            />
          }
          title={<Link
            to={`/profile/${post.user}`}
          >
            <Typography  variant="inherit" className={classes.linkStyling}
             color="textPrimary">{`${post.name}`}</Typography>
          </Link>}
          titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
          subheaderTypographyProps={{ variant: "a" }}
          subheader={
            <Link
              to={`/profile/${post.user}`}
            >
              <Typography  variant="inherit" className={classes.linkStyling}
               color="textPrimary">{`@${post.username}`}</Typography>
            </Link>
          }
        />
        <CardContent>
          <Typography variant="p" color="textPrimary">
            {post.text}
          </Typography>
        </CardContent>
        <CardActions>
          <PostLike post={post} />
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
