import api from "../utils/api";
import { CREATE_GROUP, GROUP_ERROR, GET_GROUP, GET_GROUPS } from "./types";
import { setAlert } from "./alert";

//Create a Group
export const createGroup = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/groups/create", formData);

    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    });

    dispatch(setAlert("Group Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "error")));
    }

    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get a Group by ID
export const getGroupById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/groups/get-group/${id}`);
    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getGroups = () => async (dispatch) => {
  try {
    const res = await api.get("/groups/all");
    dispatch({
      type: GET_GROUPS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const changeGroupImage = (formData, id) => async (dispatch) => {
  try {
    const res = await api.post(`/groups/updatepb/${id}`, formData, { headers: {} });

    dispatch({
      type: GET_GROUP,
      payload: res.data,
    });

    dispatch(setAlert("Group Image changed", "success"));
  } catch (err) {
    dispatch({
      type: GROUP_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

