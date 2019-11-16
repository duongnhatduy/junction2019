import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

const useStyles = makeStyles({
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
});

export const BottomNav = () => {
  const classes = useStyles();
  let location = useLocation();
  let history = useHistory();
  return (
    <BottomNavigation
      value={location.pathname}
      onChange={(event, newValue) => {
        history.push(`/${newValue}`);
      }}
      showLabels
      className={classes.stickToBottom}
    >
      <BottomNavigationAction value="" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        value="plan"
        label="Plan"
        icon={<LocalAtmIcon />}
      />
    </BottomNavigation>
  );
};
