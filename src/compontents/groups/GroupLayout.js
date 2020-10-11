import React from "react";

import {
  Container,
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const GroupLayout = ({ group,posts }) => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <Card>
        <CardHeader
          avatar={
            <Avatar
              className={classes.large}
              src={`http://localhost:5000/${group.groupImage}`}
              alt={group.name}
            />
          }
          titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
          title={group.name}
          subheaderTypographyProps={{ variant: "p" }}
          subheader={group.desc}
        />
        <CardContent>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs="3">
              <Typography variant="h6" color="textPrimary">
                {posts.length}
              </Typography>
              <Typography variant="p" color="textPrimary">
                posts
              </Typography>
            </Grid>
            <Grid item xs="3">
              <Typography variant="h6" color="textPrimary">
                {group.follower.length}
              </Typography>
              <Typography variant="p" color="textPrimary">
                Follower
              </Typography>
            </Grid>
            <Grid item xs="3">
              <Typography variant="h6" color="textPrimary">
                {group.members.length}
              </Typography>
              <Typography variant="p" color="textPrimary">
                Member
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GroupLayout;
