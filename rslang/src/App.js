import React, {useState, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/partials/Loading';
import Home from './app/Home';
import Book from './app/Book';
import Games from './app/Games';
import Stats from './app/Stats';
import Settings from './app/Settings';
import About from './app/About';
import Savannah from "./app/Games/Savannah/Savannah";
import Layout from "./components/Layout/Layout";

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

  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <Switch>
          <Route exact path="/games/savannah">
            <Savannah/>
          </Route>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/book">
                 <Book del={deleteWord} deletedWords={deletedWords} hardWords={hardWords} addToHardWords={hardWord}/>
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
