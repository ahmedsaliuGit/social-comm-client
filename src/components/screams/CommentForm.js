import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// MUI
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { postComment } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
}));

function CommentForm({ screamId }) {
  const classes = useStyles();
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const {
    UI: { errors: uiErrors },
    user: {
      credentials: { userHandle, userImage },
    },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    uiErrors.body && setErrors(uiErrors);

    if (!uiErrors.body) {
      setBody("");
      setErrors({});
    }
  }, [uiErrors]);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newComment = {
      body,
      userHandle,
      userImage,
      createdAt: new Date().toISOString(),
    };
    dispatch(postComment(screamId, newComment));
    clearError();
  };

  const clearError = () => {
    if (errors.body) {
      setErrors({});
    }
  };

  return (
    <>
      <Grid item sm={12}>
        <form onSubmit={handleSubmit}>
          <TextField
            type="textarea"
            name="body"
            label="Comment on scream"
            error={errors.body ? true : false}
            helperText={errors.body}
            value={body}
            onChange={handleChange}
            className={classes.textField}
            fullWidth
            rows={3}
          />
          <Button
            variant="contained"
            className={classes.button}
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Grid>
      <hr className={classes.visibleSeparator} />
    </>
  );
}

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
};

export default CommentForm;
