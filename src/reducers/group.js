import { CREATE_GROUP, GET_GROUP, GROUP_ERROR, GET_GROUPS } from "../actions/types";

const initialState = {
  group: null,
  groups: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        group: action.payload,
        loading: false,
      };
    case GET_GROUP:
      return {
        ...state,
        group: action.payload,
        loading: false,
      };
    case GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        group: null,
      };
    case GET_GROUPS: 
      return {
        ...state,
        groups: action.payload,
        loading: false
    }
    default:
      return state;
  }
}
