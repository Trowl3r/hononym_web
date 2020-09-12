import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  UPDATE_FOLLOWS,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case UPDATE_FOLLOWS:
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile._id === action.payload.id
            ? { ...profile, follower: action.payload.follower }
            : profile
        ),
      };
    default:
      return state;
  }
}
