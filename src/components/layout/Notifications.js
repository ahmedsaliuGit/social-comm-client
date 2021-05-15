import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

function Notifications(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  dayjs.extend(relativeTime);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen = () => {
    let unreadNotificationIds = notifications
      .filter((notif) => !notif.read)
      .map((notif) => notif.notificationId);

    dispatch(markNotificationsRead(unreadNotificationIds));
  };

  let notificationsIcon;

  if (notifications && notifications.length > 0) {
    notifications.filter((notif) => notif.read === false).length > 0
      ? (notificationsIcon = (
          <Badge
            badgeContent={
              notifications.filter((notif) => notif.read === false).length
            }
            color="secondary"
          >
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notif) => {
        const verb = notif.type === "like" ? "liked" : "commented on";
        const time = dayjs(notif.createdAt).fromNow();
        const iconColor = notif.read ? "primary" : "secondary";
        const icon =
          notif.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ margin: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ margin: 10 }} />
          );

        return (
          <MenuItem key={notif.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              to={`/users/${notif.recipient}/scream/${notif.screamId}`}
              variant="body1"
              color="textSecondary"
            >
              {notif.sender} {verb} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notification yet</MenuItem>
    );

  return (
    <>
      <Tooltip placeholder="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={handleMenuOpen}
      >
        {notificationsMarkup}
      </Menu>
    </>
  );
}

export default Notifications;
