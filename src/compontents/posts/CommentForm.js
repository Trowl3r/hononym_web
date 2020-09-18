import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

//Material UI
import {
  Button,
  Container,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  buttonImage: {
    marginTop: theme.spacing(1),
  },
}));

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h6">Leave a Comment</Typography>
      <form
        className={classes.form}
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <TextField
          name="text"
          cols={30}
          rows={5}
          placeholder="Comment the post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          multiline
          fullWidth
          color="secondary"
          variant="outlined"
        />
        <Button className={classes.buttonImage}>
          <ImageIcon />
        </Button>
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Comment
        </Button>
      </form>
    </Container>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
