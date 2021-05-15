import React, { useRef } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import CustomButtonWithTooltip from "../screams/CustomButtonWithTooltip";
// MUI modules
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
// Icons
import Edit from "@material-ui/icons/Edit";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
// Redux modules/stuff
import { useDispatch, useSelector } from "react-redux";
import { imageUpload, logoutUser } from "../../redux/actions/userActions";
import ProfileSkeleton from "../../utils/ProfileSkeleton";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
}));

function Profile(props) {
  const classes = useStyles();
  const {
    credentials: { handle, bio, location, website, createdAt, imageUrl },
    loading,
    authenticated,
  } = useSelector((state) => state.user);
  const imageInput = useRef(null);
  const dispatch = useDispatch();

  const clickFileInput = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();

    formData.append("image", file, file.name);
    dispatch(imageUpload(formData));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.Paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              ref={imageInput}
              hidden="hidden"
              onChange={handleImageChange}
            />
            <CustomButtonWithTooltip
              title="Upload new Image"
              onClick={clickFileInput}
              btnClassName="button"
            >
              <Edit color="primary"></Edit>
            </CustomButtonWithTooltip>
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
          <CustomButtonWithTooltip title="Logout" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </CustomButtonWithTooltip>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/signup"
            variant="contained"
            color="secondary"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
  return profileMarkup;
}

export default Profile;
