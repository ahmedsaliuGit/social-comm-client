import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI modules
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
// Icons
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

import { useDispatch } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";
import CustomButtonWithTooltip from "./CustomButtonWithTooltip";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    position: "absolute",
    top: "10%",
    left: "90%",
  },
}));

function DeleteScream({ screamId }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(false);

    dispatch(deleteScream(screamId));
  };

  return (
    <>
      <CustomButtonWithTooltip
        title="Delete"
        onClick={() => setOpen(true)}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutlined color="disabled" />
      </CustomButtonWithTooltip>
      {/* Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete} color="default">
            Delete
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteScream.propTypes = {
  screamId: PropTypes.string.isRequired,
};

export default DeleteScream;
