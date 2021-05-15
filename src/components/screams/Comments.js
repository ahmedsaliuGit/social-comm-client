import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
// MUI
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
  gridStyles: {
    marginLeft: 10,
    marginBottom: 10,
  },
}));

function Comments({ comments }) {
  const classes = useStyles();

  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;

        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container className={classes.gridStyles}>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="Profile"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      component={Link}
                      variant="h5"
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr className={classes.visibleSeparator} />
            )}
          </Fragment>
        );
      })}
    </Grid>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default Comments;
