import {
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  SET_SCREAMS,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  POST_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return { ...state };
    case DELETE_SCREAM:
      const screamIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(screamIndex, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    case POST_COMMENT:
      return {
        ...state,
        scream: {
          ...state.scream,
          commentCount: state.scream.commentCount + 1,
          comments: [action.payload, ...state.scream.comments],
        },
      };
    default:
      return state;
  }
};

export default reducer;
