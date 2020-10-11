import api from "../utils/api";
import { setAlert } from "./alert";
import {
  ADD_POST,
  POST_ERROR,
  UPDATE_LIKES,
  GET_POSTS,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPDATE_COMMENT_LIKES,
  DELETE_POST,
} from "./types";

export const addPost = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/posts/post", formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });

    setTimeout(5000);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });

    setTimeout(5000);
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/posts/get-posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/posts/delete/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfilePostsById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/profile/${id}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/posts/post/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Like Comment
export const likeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/like-comment/${postId}/${commentId}`);

    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: { commentId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Unlike Comment
export const unlikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/unlike-comment/${postId}/${commentId}`);
    dispatch({
      type: UPDATE_COMMENT_LIKES,
      payload: { commentId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const createGroupPost = (text, id) => async (dispatch) => {
  try {
    const res = await api.post(`/groups/group-post/${id}`, text);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGroupPosts = (id) => async (dispatch) => {
  try {
    const res = await api.get(`groups/get-group-posts/${id}`);

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const deleteGroupPost = (groupId, id) => async (dispatch) => {
  try {
    const res = api.delete(`groups/delete-group-post/${groupId}/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });
  } catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}