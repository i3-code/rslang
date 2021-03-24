import React, {useState, Suspense } from 'react';
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

function App() {
  const [deletedWords, setDeletedWords] = useState({})
  const [hardWords, setHardWords] = useState({})

  const deleteWord = ([page, wordId]) => {
    const newDeletedWords = Object.assign({}, deletedWords)
    newDeletedWords[page] ? newDeletedWords[page].push(wordId) : newDeletedWords[page] = [wordId]
    setDeletedWords(newDeletedWords)
  }

  const hardWord = ([page, wordId]) => {
    const newHardWords = Object.assign({}, hardWords)
    newHardWords[page] ? newHardWords[page].push(wordId) : newHardWords[page] = [wordId]
    setHardWords(newHardWords)
  }

  const classes = useStyles();
  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <div className={classes.root}>
          <Header />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/book">
                 <Book del={deleteWord} deletedWords={deletedWords} hardWords={hardWords} addToHardWords={hardWord}/>
              </Route>
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
          </main>
        </div>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
