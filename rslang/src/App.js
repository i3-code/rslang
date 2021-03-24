import React, { Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/partials/Loading';
import Header from './components/partials/Header';
import Footer from './components/partials/Footer';

import Home from './app/Home';
import Book from './app/Book';
import Games from './app/Games';
import Stats from './app/Stats';
import Settings from './app/Settings';
import About from './app/About';

import useStyles from './styles';
import Savannah from "./app/Games/Savannah/Savannah";

function App() {
  const classes = useStyles();
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <Switch>
          <Route exact path="/games/savannah">
            <Savannah/>
          </Route>
          <div className={classes.root}>
            <Header />
            <main className={classes.content}>
              <div className={classes.toolbar} />
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
            </main>
          </div>
          <Footer />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
