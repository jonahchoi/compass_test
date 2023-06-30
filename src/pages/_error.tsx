import { NextPage, NextPageContext } from "next";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface ErrorProps {
  statusCode?: number;
}

const CustomError: NextPage<ErrorProps> = ({ statusCode }) => {
  if (statusCode) {
    return (
      <>
        <Snackbar
          open={true}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Alert severity="error">Error: Page cannot be displayed</Alert>
        </Snackbar>
      </>
    );
  }

  return <>GENERIC ERROR MSG HERE</>;
};

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;