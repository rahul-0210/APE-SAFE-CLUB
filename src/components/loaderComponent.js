import React from "react";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useSelector } from "react-redux";

const loaderStyles = () => ({
  backdrop: {
    zIndex: 1000,
  },
});

const LoaderComponent = (props) => {
  const { classes } = props;

  const { isLoaderOpen, reloadWarning } = useSelector((state) => state.masterReducer);

  return (
    <Backdrop className={classes.backdrop} open={isLoaderOpen}>
      <div style={{ display: "flex-column", textAlign: "center" }}>
        <CircularProgress color='primary' />
        {reloadWarning && <div style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>{reloadWarning}</div>}
      </div>
    </Backdrop>
  );
};

export default withStyles(loaderStyles)(LoaderComponent);
