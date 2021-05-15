import React from "react";
import CustomButtonWithTooltip from "./CustomButtonWithTooltip";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

function LikeAndUnlikeButton({ screamId, likeCount }) {
  const { likes, authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isLikedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) {
      return true;
    } else {
      return false;
    }
  };

  const onLikeScream = () => {
    dispatch(likeScream(screamId));
  };

  const onUnlikeScream = () => {
    dispatch(unlikeScream(screamId));
  };

  const likeButton = !authenticated ? (
    <CustomButtonWithTooltip title="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </CustomButtonWithTooltip>
  ) : isLikedScream() ? (
    <CustomButtonWithTooltip title="Undo like" onClick={onUnlikeScream}>
      <FavoriteIcon color="primary" />
    </CustomButtonWithTooltip>
  ) : (
    <CustomButtonWithTooltip title="Like" onClick={onLikeScream}>
      <FavoriteBorder color="primary" />
    </CustomButtonWithTooltip>
  );

  return (
    <>
      {likeButton}
      <span>{likeCount} Likes</span>
    </>
  );
}

LikeAndUnlikeButton.propTypes = {
  screamId: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
};

export default LikeAndUnlikeButton;
