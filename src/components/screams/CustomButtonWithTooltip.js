import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const CustomButtonWithTooltip = ({
  btnClassName,
  title,
  onClick,
  tipClassName,
  children,
}) => {
  return (
    <Tooltip title={title} placement="top" className={tipClassName}>
      <IconButton onClick={onClick} className={btnClassName}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

CustomButtonWithTooltip.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element,
};

export default CustomButtonWithTooltip;
