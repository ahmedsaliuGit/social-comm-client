import React, { useState, useEffect } from "react";
import CustomButtonWithTooltip from "./CustomButtonWithTooltip";
// MUI stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { postScream } from "../../redux/actions/dataActions";
import { CLEAR_ERRORS, SET_ERRORS } from "../../redux/types";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
    cursor: "pointer",
  },
  button: {
    float: "right",
    marginTop: 10,
    "&:hover": {
      backgroundColor: "#618833",
    },
    position: "relative",
  },
}));

function PostScream(props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const { errors: uiErrors, loading } = useSelector((state) => state.UI);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    uiErrors.body && setErrors(uiErrors);

    if (!uiErrors.body && !loading) {
      setBody("");
      setErrors({});
      setOpen(false);
    }
  }, [uiErrors, loading]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (body.trim() === "") {
      dispatch({ type: SET_ERRORS, payload: { body: "cannot be empty" } });
      return;
    }

    dispatch(postScream({ body }));
  };

  const handleChange = (event) => {
    clearError();
    setBody(event.target.value);
  };

  const clearError = () => {
    if (errors.body) {
      setErrors({});
    }
  };

  const handleClose = () => {
    clearError();
    dispatch({ type: CLEAR_ERRORS });
    setOpen(false);
  };

  return (
    <>
      <CustomButtonWithTooltip title="New Scream" onClick={() => setOpen(true)}>
        <AddIcon />
      </CustomButtonWithTooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create New Scream</DialogTitle>
        <CloseIcon onClick={handleClose} className={classes.closeButton} />
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              id="body"
              type="textarea"
              rows={3}
              placeholder="Post reasonable something"
              label="Scream"
              value={body}
              className={classes.TextField}
              onChange={handleChange}
              error={errors.body ? true : false}
              helperText={errors.body}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress size="30" className={classes.progress} />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PostScream;
