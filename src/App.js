import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Overview } from "./feature/Overview";
import { PurchasePlan } from "./feature/PurchasePlan";
import { BottomNav } from "./layout/BottomNav";
import { Container } from "@material-ui/core";

function App() {
  return (
    <Router>
      <Container>
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
      <BottomNav />
    </Router>
  );
}

export default App;
