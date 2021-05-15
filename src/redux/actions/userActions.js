import axios from "axios";
import {
  CLEAR_ERRORS,
  LOADING_UI,
  LOADING_USER,
  MARK_NOTIFICATION_READ,
  SET_ERRORS,
  SET_UNAUTHENTICATED,
  SET_USER,
} from "../types";

export const loginUser = (userData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/signin", userData);

    if (res.data) {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const signupUser = (newData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/signup", newData);

    if (res.data) {
      setAuthorization(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });

      history.push("/");
    }
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("FBIdToken");
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.get("/user");

    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const imageUpload = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_USER });

  try {
    const res = await axios.post("/user/image-upload", formData);

    if (res) dispatch(getUserData());
  } catch (err) {
    console.log(err);
    dispatch(getUserData());
  }
};

export const editUserDetails = (userDetails) => async (dispatch) => {
  dispatch({ type: LOADING_USER });

  try {
    const res = await axios.post("/user", userDetails);

    if (res) dispatch(getUserData());
  } catch (err) {
    console.log(err);
    dispatch(getUserData());
  }
};

export const markNotificationsRead = (notificationIds) => async (dispatch) => {
  try {
    await axios.post("/notifications/", { body: notificationIds });

    dispatch({ type: MARK_NOTIFICATION_READ });
  } catch (err) {
    console.log(err.response.data);
  }
};

const setAuthorization = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
