import React, { useEffect, useState, useCallback } from "react";
import CustomButtonWithTooltip from "./CustomButtonWithTooltip";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LikeAndUnlikeButton from "./LikeAndUnlikeButton";
import dayjs from "dayjs";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
// MUI stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { clearError, getScream } from "../../redux/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  profileImage: {
    width: 200,
    height: 200,
    objectFit: "cover",
    borderRadius: "50%",
  },

  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  circularDiv: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  divContent: {
    marginLeft: 13,
  },
}));

function ScreamDialog({ screamId, userHandle, openDialog }) {
  const [open, setOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");
  // const [newPath, setNewPath] = useState("");
  const {
    UI: { loading },
    data: {
      scream: { body, createdAt, userImage, likeCount, commentCount, comments },
    },
    user: { authenticated },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOpen = useCallback(() => {
    let oldP = window.location.pathname;
    const newP = `/users/${userHandle}/scream/${screamId}`;

    if (oldP === newP) oldP = `/users/${userHandle}`;

    dispatch(getScream(screamId));
    setOpen(true);
    window.history.pushState(null, null, newP);
    // setNewPath(newP);
    setOldPath(oldP);
  }, [dispatch, screamId, userHandle]);

  useEffect(() => {
    if (openDialog) {
      handleOpen();
    }
  }, [openDialog, handleOpen]);

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    dispatch(clearError());
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <div className={classes.circularDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={2}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <div className={classes.divContent}>
          <Typography component={Link} variant="h5" to={`/users/${userHandle}`}>
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
        </div>
        <LikeAndUnlikeButton screamId={screamId} likeCount={likeCount || 0} />
        <span>
          <CustomButtonWithTooltip title="Comment">
            <ChatIcon color="primary" />
          </CustomButtonWithTooltip>
          {commentCount} Comments
        </span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      {authenticated ? <CommentForm screamId={screamId} /> : null}
      <Comments comments={comments || []} />
    </Grid>
  );

  return (
    <>
      <CustomButtonWithTooltip
        title="Scream detail"
        onClick={handleOpen}
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </CustomButtonWithTooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <CustomButtonWithTooltip
          onClick={handleClose}
          title="Close modal"
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </CustomButtonWithTooltip>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </>
  );
}

ScreamDialog.propTypes = {
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
};

export default ScreamDialog;
