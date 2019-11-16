import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { Overview } from './feature/Overview';
import { PurchasePlan } from './feature/PurchasePlan';
import { Layout } from './layout/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Overview />
          </Route>
          <Route path="/plan" exact>
            <PurchasePlan />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
