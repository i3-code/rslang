import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/partials/Loading';

import Home from './app/Home';
import Book from './app/Book';
import Games from './app/Games';
import Stats from './app/Stats';
import Settings from './app/Settings';
import About from './app/About';
import Savannah from './app/Games/Savannah/Savannah';
import Sprint from './app/Games/Sprint';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <Switch>
          <Route exact path="/games/savannah">
            <Savannah />
          </Route>
          <Route exact path="/games/sprint">
            <Sprint />
          </Route>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/book">
                <Book />
              </Route>
              <Route exact path="/games">
                <Games />
              </Route>
              <Route path="/stats">
                <Stats />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Route path="/about">
                <About />
              </Route>
            </Switch>
          </Layout>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
