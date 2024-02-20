import React from "react";
import { Link as RLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

const Link = ({ to, children, ...props }) => {
  return (
    <>
      <MuiLink color="text.primary" sx={{ my: 1, mx: 1.5 }}>
        <RLink to={to} {...props}>
          {children}
        </RLink>
      </MuiLink>
    </>
  );
};

export default Link;
