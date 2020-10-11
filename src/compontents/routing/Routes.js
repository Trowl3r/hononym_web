import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";

//Components
import Register from "../auth/Register";
import Alerts from "../layout/Alerts";
import Login from "../auth/Login";
import ProfileForm from "../profiles/ProfileForm";
import Profile from "../profiles/Profile";
import Profiles from "../profiles/Profiles";
import Posts from "../posts/Posts";
import Post from "../posts/Post";
import GroupForm from '../groups/GroupForm';
import Group from "../groups/Group";
import Groups from './../groups/Groups';
import ProfileImage from './../profiles/ProfileImage';
import GroupImage from './../groups/GroupImage';
import ProfileMe from "../profiles/ProfileMe";
import Settings from "../layout/Settings";


//Private Route
import PrivateRoute from "./PrivateRoute";

const Routes = (props) => {
  return (
    <Container>
      <Alerts />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profiles" component={Profiles} />
        <Route exact path="/groups" component={Groups} />
        <PrivateRoute exact path="/profile/settings" component={Settings} />
        <PrivateRoute exact path="/profile/me" component={ProfileMe} />
        <PrivateRoute exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/profile-image" component={ProfileImage} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/post/:id" component={Post} />
        <PrivateRoute exact path="/group/:id" component={Group} />
        <PrivateRoute exact path="/create-group" component={GroupForm} />
        <PrivateRoute exact path="/group-image/:id" component={GroupImage} /> 
      </Switch>
    </Container>
  );
};

export default Routes;
