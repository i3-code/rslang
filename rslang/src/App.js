import React, {useState, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/partials/Loading';

import Home from './app/Home';
import Book from './app/Book';
import Games from './app/Games';
import Stats from './app/Stats';

function App() {
  const [deletedWords, setDeletedWords] = useState([])
  const [hardWords, setHardWords] = useState([])

  const deleteWord = (wordId) => {
    console.log(wordId)
    setDeletedWords([...deletedWords, wordId])
  }

  return (
    <Suspense fallback={<Loading fullScreen />}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/book">
              <Book del={deleteWord} deletedWords={deletedWords}/>
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
