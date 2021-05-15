import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
} from "../types";

const initialState = {
  loading: false,
  errors: {},
};

const reducer = function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        errors: action.payload,
        loading: false,
      };
    case CLEAR_ERRORS:
      return initialState;
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
