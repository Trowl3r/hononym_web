import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import { deleteComment } from "../../actions/post";
import CommentLikes from "./CommentLikes";
import {
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardContent,
  Typography,
  CardActions,
  Button
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

const CommentItem = ({ postId, comment, auth, deleteComment }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <Card className={classes.cardStyle}>
        <CardHeader
          avatar={
            <Avatar
              src={`http://localhost:5000/${comment.profileImage}`}
              alt={comment.username}
              className={classes.large}
            />
          }
          title={
            <Link to={`/profile/${comment.user}`}>
              <Typography
                variant="inherit"
                className={classes.linkStyling}
                color="textPrimary"
              >{`${comment.name}`}</Typography>
            </Link>
          }
          titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
          subheaderTypographyProps={{ variant: "a" }}
          subheader={
            <Link to={`/profile/${comment.user}`}>
              <Typography
                variant="inherit"
                className={classes.linkStyling}
                color="textPrimary"
              >{`@${comment.username}`}</Typography>
            </Link>
          }
        />
        <CardContent>
          <Typography variant="p" color="textPrimary">
            {comment.text}
          </Typography>
        </CardContent>
        <CardActions>
          <CommentLikes comment={comment} postId={postId} />
          {!auth.loading && comment.user === auth.user._id && (
            <Button
              onClick={() => deleteComment(postId, comment._id)}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
