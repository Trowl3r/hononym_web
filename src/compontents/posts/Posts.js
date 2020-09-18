import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import {getPosts} from "../../actions/post";

//Material UI 
import {Container, Typography} from "@material-ui/core";

const Posts = ({getPosts, post: {posts}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Container component="main" maxWidth="sm">
            <Typography variant="h6">
                Posts
            </Typography>
            <PostForm />
            {posts.map(post => (
                <PostItem key={post._id} post={post} />
            ))}
        </Container>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {getPosts})(Posts)