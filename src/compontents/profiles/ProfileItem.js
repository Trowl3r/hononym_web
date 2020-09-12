import React, { Fragment } from "react";
import PropTypes from "prop-types";

//Material UI
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import ProfileFollowing from "./ProfileFollowing";


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  linkColor: {
    color: '#9E9E9E',
    textDecoration: 'none'
  },
  linkColorName: {
    
  },  
  action: {
    alignSelf: 'center'
  },
  cardClass: {
    borderRadius: '0px',
  }
}));

const ProfileItem = ({
  profile,
}) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="md">
      <Card classes={{root: classes.cardClass}}>
        <CardHeader
          avatar={
            <Avatar
              src={`http://localhost:5000/${profile.profileImage}`}
              alt={profile.name}
              className={classes.large}
            />
          }

          classes={classes.cardHeader}

          classes={{action: classes.action}}

          action={
            <ProfileFollowing profile={profile}/>
          }

          titleTypographyProps={{variant: 'h6', color: "primary"}}
          title={<Link href={`/profile/${profile.user._id}`} underline={'none'} color="textPrimary">{profile.name}</Link>}
          subheaderTypographyProps={{variant: 'p'}}
          subheader={<Link href={`/profile/${profile.user._id}`} underline={'none'} color="textSecondary"> @{profile.user.username}</Link>}
        />
      </Card>
    </Container>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
