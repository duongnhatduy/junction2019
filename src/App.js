import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { Overview } from "./feature/Overview";
import { PurchasePlan } from "./feature/PurchasePlan";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

function App() {
  const [nav, setNav] = useState("");
  return (
    <Router>
      <div className="App">
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/plan">Purchase Plan</Link>
              </li>
            </ul>
          </nav>

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
        </div>
      </div>
      <BottomNavigation
        value={nav}
        onChange={(event, newValue) => {
          setNav(newValue);
        }}
        showLabels
        // className={classes.root}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Plan" icon={<LocalAtmIcon />} />
      </BottomNavigation>
    </Router>
  );
}

export default App;
