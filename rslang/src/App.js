import React, { Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/partials/Loading';

import Home from './app/Home';
import Book from './app/Book';
import Section from './app/Book/Section';
import Games from './app/Games';
import Stats from './app/Stats';
import Settings from './app/Settings';
import About from './app/About';
import Layout from './components/Layout';

function App() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/book/:group" component={Section} />
            <Route path="/book">
              <Book />
            </Route>
            <Route path="/games/:game" component={Games} />
            <Route path="/games">
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
      </Router>
    </Suspense>
  );
}

export default App;
