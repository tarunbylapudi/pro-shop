import React from "react";
// import { Alert as MuiAlert } from "@mui/material/Alert";

import { Alert as MuiAlert } from "@mui/material";
import { Button } from "@mui/material";

const Alert = ({ message, severity = "info", action, actionHandler }) => {
  return (
    <>
      <MuiAlert
        severity={severity}
        action={
          action && (
            <Button color="inherit" size="small" onClick={actionHandler}>
              {action}
            </Button>
          )
        }
      >
        {message}
      </MuiAlert>
    </>
  );
};

export default Alert;
