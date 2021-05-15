import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
// MUI modules
import makeStyles from "@material-ui/core/styles/makeStyles";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
}));

function StaticProfile({ profile }) {
  const classes = useStyles();
  const { handle, imageUrl, createdAt, bio, location, website } = profile;

  let profileMarkup = (
    <Paper className={classes.Paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            variant="h5"
            color="primary"
            to={`/users/${handle}`}
          >
            @{handle}
          </MuiLink>

          <hr />
          {bio && <Typography variant="body2">{bio}</Typography>}
          <hr />
          {location && (
            <>
              <LocationOn color="primary" />
              <span>{location}</span>

              <hr />
            </>
          )}
          {website && (
            <>
              <LinkIcon color="primary" />
              <a href={website} target="_blank" rel="noopener noreferrer">
                {" "}
                {website}
              </a>
              <hr />
            </>
          )}
          {createdAt && (
            <>
              <CalendarToday color="primary" />
              <span> Joined {dayjs(createdAt).format("MMM YYYY")}</span>
              <hr />
              <br />
            </>
          )}
        </div>
      </div>
    </Paper>
  );
  return profileMarkup;
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default StaticProfile;
