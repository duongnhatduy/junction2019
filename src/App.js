import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import { Overview } from "./feature/Overview";
import { PurchasePlan } from "./feature/PurchasePlan";

function App() {
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
    </Router>
  );
}

export default App;
