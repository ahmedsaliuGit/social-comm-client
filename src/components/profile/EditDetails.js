import React, { useState, useEffect } from "react";
import CustomButtonWithTooltip from "../screams/CustomButtonWithTooltip";
// MUI stuff
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";
// Redux stuff
import { useDispatch, useSelector } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  ...theme.global,
  button: {
    float: "right",
  },
}));

function EditDetails() {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const { credentials } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    credentials.bio && setBio(credentials.bio);
    credentials.location && setLocation(credentials.location);
    credentials.website && setWebsite(credentials.website);
  }, [credentials.bio, credentials.location, credentials.website]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "location":
        setLocation(value);
        break;
      case "website":
        setWebsite(value);
        break;
      case "bio":
        setBio(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setOpen(false);
    dispatch(editUserDetails({ bio, location, website }));
  };

  return (
    <>
      <CustomButtonWithTooltip
        title="Edit Profile"
        onClick={() => setOpen(true)}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </CustomButtonWithTooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit profile details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="location"
              type="text"
              placeholder="Your location"
              value={location}
              className={classes.TextField}
              label="Location"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="website"
              type="text"
              placeholder="Your personal/professional website"
              value={website}
              className={classes.TextField}
              label="Website"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              name="bio"
              type="text"
              multiline
              rows="3"
              placeholder="Your bio"
              value={bio}
              className={classes.TextField}
              label="Bio"
              fullWidth
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Update
          </Button>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditDetails;
