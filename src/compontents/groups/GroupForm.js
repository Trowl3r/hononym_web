import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createGroup } from "../../actions/group";
import { setAlert } from "../../actions/alert";
import { withRouter } from 'react-router-dom';

//Material Ui
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

//Style for Classes
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  label: {
    paddingLeft: "0.3%",
  },
}));

const GroupForm = ({ createGroup, history }) => {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    isPrivate: false,
  });

  const { name, desc, isPrivate } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.length > 0) {
      createGroup(formData);
      history.push("/");
    } else {
      setAlert("A Group Name needs to be Provided", "danger", 3000);
    }
  };
  const handleCheck = (e) => {
      console.log(isPrivate);
    setFormData({ ...formData, isPrivate: !isPrivate });
  };

  const classes = useStyles();
  return (
    <Container component="main" maxWidth="sm">
      <form className={classes.form} onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              placeholder="Name of the Group"
              name="name"
              type="name"
              value={name}
              onChange={onChange}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Description"
              name="desc"
              type="name"
              value={desc}
              onChange={onChange}
              color="secondary"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              className={classes.label}
              control={
                <Checkbox
                  checked={isPrivate}
                  onChange={handleCheck}
                  name="private"
                />
              }
              label="Private"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Confirm
        </Button>
      </form>
    </Container>
  );
};

GroupForm.propTypes = {
  createGroup: PropTypes.func.isRequired,
};

export default connect(null, { createGroup })(withRouter(GroupForm));
