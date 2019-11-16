import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { Overview } from "./feature/Overview";
import { PurchasePlan } from "./feature/PurchasePlan";
import {
  Container,
  BottomNavigation,
  BottomNavigationAction
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

const useStyles = makeStyles({
  root: {
    width: 500
  },
  stickToBottom: {
    width: "100%",
    position: "fixed",
    bottom: 0
  }
});

function App() {
  const classes = useStyles();
  const [nav, setNav] = useState("");
  return (
    <Router>
      <Container fixed>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <Overview />
          </Route>
          <Route path="/plan" exact>
            <PurchasePlan />
          </Route>
        </Switch>
      </Container>
      <BottomNavigation
        value={nav}
        onChange={(event, newValue) => {
          setNav(newValue);
        }}
        showLabels
        className={classes.stickToBottom}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Plan" icon={<LocalAtmIcon />} />
      </BottomNavigation>
    </Router>
  );
}

export default App;
