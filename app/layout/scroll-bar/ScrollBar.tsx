import PropTypes from "prop-types";
import React, { memo, forwardRef, ReactNode, CSSProperties } from "react";
import { SxProps } from "@mui/system";

import Box from "@mui/material/Box";

import { StyledScrollbar, StyledRootScrollbar } from "./styles";

// ----------------------------------------------------------------------

interface ScrollbarProps {
  children?: ReactNode;
  sx?: SxProps;
}

// eslint-disable-next-line react/display-name
const ScrollBar = forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ children, sx, ...other }, ref) => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    if (mobile) {
      return (
        <Box
          ref={ref}
          sx={{ overflow: "auto", ...(sx as CSSProperties) }}
          {...other}
        >
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  }
);

ScrollBar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};

export default memo(ScrollBar);
