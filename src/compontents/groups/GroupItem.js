import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Material UI
import { Avatar, CardHeader, Container, Card, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardClass: {
    borderRadius: "0px",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  action: {
    alignSelf: "center",
  },
}));

const GroupItem = ({
  group: { name, desc, members, follower, posts, _id, groupImage },
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Card classes={{ root: classes.cardClass }}>
        <CardHeader
          avatar={
            <Avatar
              src={`http://localhost:5000/${groupImage}`}
              alt={name}
              className={classes.large}
            />
          }
          classes={{ action: classes.action }}
          
          action={
            <Button href={`/group/${_id}`} color="primary" variant="contained">Go to Group</Button>
          }

          titleTypographyProps={{variant: 'h6', color: "textPrimary"}}
          title={name}
          subheaderTypographyProps={{variant: 'p'}}
          subheader={desc}
        />
      </Card>
    </Container>
  );
};

GroupItem.propTypes = {
  group: PropTypes.object.isRequired,
};

export default GroupItem;
