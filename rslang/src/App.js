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
import { Examples } from './app/Examples';
import Dictionary from './app/Dictionary';

function App() {
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/book/:group" component={Section} />
            <Route path="/book" component={Book} />
            <Route path="/games/:game" component={Games} />
            <Route path="/games" component={Games} />
            <Route path="/stats" component={Stats} />
            <Route path="/settings" component={Settings} />
            <Route path="/about" component={About} />
            <Route path="/examples" component={Examples} />
            <Route path="/dictionary" component={Dictionary} />
          </Switch>
        </Layout>
      </Router>
    </Suspense>
  );
}

export default App;
