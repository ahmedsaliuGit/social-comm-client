import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CustomButtonWithTooltip from "./CustomButtonWithTooltip";
import ChatIcon from "@material-ui/icons/Chat";
import { useSelector } from "react-redux";

import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LikeAndUnlikeButton from "./LikeAndUnlikeButton";

const useStyles = makeStyles((theme) => ({
  card: { display: "flex", position: "relative", marginBottom: 20 },
  media: { minWidth: 200 },
  content: { padding: 25, objectFit: "cover" },
}));

function Scream(props) {
  const classes = useStyles();
  const {
    scream: {
      body,
      createdAt,
      userHandle,
      userImage,
      screamId,
      likeCount,
      commentCount,
    },
    openDialog,
  } = props;
  const {
    authenticated,
    credentials: { handle },
  } = useSelector((state) => state.user);

  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia image={userImage} title="Scream" className={classes.media} />
      <CardContent>
        <Typography variant="h5">
          <Link to={`/users/${userHandle}`}>{userHandle}</Link>
        </Typography>
        {deleteButton}
        <Typography variant="body2">{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeAndUnlikeButton screamId={screamId} likeCount={likeCount} />

        <CustomButtonWithTooltip title="Comment">
          <ChatIcon color="primary" />
        </CustomButtonWithTooltip>
        <span>{commentCount} Comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
}

Scream.propTypes = {
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

export default Scream;
