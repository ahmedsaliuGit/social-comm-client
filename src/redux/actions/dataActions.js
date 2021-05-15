import {
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_SCREAMS,
  DELETE_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  POST_COMMENT,
} from "../types";
// Redux
import axios from "axios";

// get all screams
export const getScreams = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  try {
    const res = await axios.get("/screams");

    dispatch({ type: SET_SCREAMS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: SET_SCREAMS, payload: [] });
  }
};

export const getScream = (screamId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.get(`/scream/${screamId}`);

    dispatch({ type: SET_SCREAM, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.log(err);
    dispatch({ type: STOP_LOADING_UI });
  }
};

export const postScream = (newScream) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.post("/screams", newScream);

    dispatch({ type: POST_SCREAM, payload: res.data.data });
    dispatch(clearError());
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

// Like a scream
export const likeScream = (screamId) => async (dispatch) => {
  try {
    const res = await axios.get(`/scream/${screamId}/like`);

    dispatch({ type: LIKE_SCREAM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// Unlike a scream
export const unlikeScream = (screamId) => async (dispatch) => {
  try {
    const res = await axios.get(`/scream/${screamId}/unlike`);

    dispatch({ type: UNLIKE_SCREAM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (screamId, newComment) => async (dispatch) => {
  try {
    const res = await axios.post(`/scream/${screamId}/comment`, newComment);

    dispatch({ type: POST_COMMENT, payload: res.data });
    dispatch(clearError());
  } catch (err) {
    console.log(err);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};

// Delete a scream
export const deleteScream = (screamId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/scream/${screamId}`);

    if (res.data) {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    }
  } catch (err) {
    console.log(err);
  }
};

// Get user data according to the handle
export const getUserData = (handle) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  try {
    const res = await axios.get(`/user/${handle}`);

    dispatch({ type: SET_SCREAMS, payload: res.data.screams });
  } catch (err) {
    dispatch({ type: SET_SCREAMS, payload: [] });
  }
};

export const clearError = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
