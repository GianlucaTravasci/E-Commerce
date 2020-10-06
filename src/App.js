import React from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';

import HomePage from './pages/homepage/homepage.component'

const HatsPage = () =>{
  return(<h1>Hats here</h1>)
}

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/shop/hats">
          <HatsPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
