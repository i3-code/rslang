import React, { Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/partials/Loading';

import Home from './app/Home';
import Book from './app/Book';
import Games from './app/Games';
import Stats from './app/Stats';
import Savannah from "./app/Games/Savannah/Savannah";

function App() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <div>
          <Switch>
            <Route path="/games/savannah">
              <Savannah />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/book">
              <Book />
            </Route>
            <Route path="/games">
              <Games />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
