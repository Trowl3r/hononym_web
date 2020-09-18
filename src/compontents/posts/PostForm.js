import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

//Material UI
import Container from "@material-ui/core/Container";
import { makeStyles, TextField, Button, Grid } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(1),
  },
  buttonImage: {
    marginTop: theme.spacing(1),
  },
  buttons: {
    width: "95%",
    margin: "auto"
  },
}));

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText("");
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <form onSubmit={onSubmit} className={classes.form}>
        <TextField
          name="text"
          cols={100}
          multiline
          rows={5}
          variant="outlined"
          color="secondary"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          fullWidth
        />
        <div className={classes.buttons}>
          <Grid container>
            <Grid item xs={10} offset={1}>
              <Button className={classes.buttonImage}>
                <ImageIcon />
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
