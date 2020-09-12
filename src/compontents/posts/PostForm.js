import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import Container from "@material-ui/core/Container";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({text});
    setText('');
  }

  return (
    <Container component="main" maxWidth="sm">
      <form onSubmit={onSubmit}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button type='submit'>Submit</button>
      </form>
    </Container>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
