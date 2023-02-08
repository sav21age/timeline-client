import React, { useState, useEffect } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IconButton } from "@mui/material";

const styles = {
  toTop: {
    zIndex: 2,
    position: "fixed",
    bottom: "7vh",
    color: "#348C31",
    "&:hover, &.Mui-focusVisible": {
      transition: "0.3s",
    },
    left: { xs: "1.2%", sm: "2.4%" },
  },
};

interface Props {
  showBelow: number
}

const ScrollTop = ({ showBelow }: Props) => {
  const [show, setShow] = useState(showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` });
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener(`scroll`, handleScroll);
      return () => window.removeEventListener(`scroll`, handleScroll);
    }
  });

  return (
    <div>
      {show && (
        <IconButton
          onClick={handleClick}
          sx={styles.toTop}
          aria-label="to top"
          component="span"
        >
          <ExpandLessIcon />
        </IconButton>
      )}
    </div>
  );
};
export default ScrollTop;
