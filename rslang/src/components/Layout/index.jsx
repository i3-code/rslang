import React from 'react';
import { useLocation } from 'react-router';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import Header from '../partials/Header';
import Footer from '../partials/Footer';

import useStyles from '../../styles';

const palettes = {
  '/' : '#3f51b5',
  '/book' : '#a1be95',
  '/games' : '#e2dfa2',
  '/stats' : '#92aac7',
  '/settings' : '#ed5752',
  '/about' : '#ffdb5c',

  '/games/savannah' : '#f9f53e',
  '/games/audiocall' : '#4099ff',
  '/games/sprint' : '#ff5370',
  '/games/ourgame' : '#2ed8b6',

  '/book/0' : '#4099ff',
  '/book/1' : '#2ed8b6',
  '/book/2' : '#ffb64d',
  '/book/3' : '#ff5370',
  '/book/4' : '#c882e2',
  '/book/5' : '#f9f53e',
}

const getThemeByName = (pathname) => {
  const color = palettes[pathname];
  if (!color) return createMuiTheme({});
  return createMuiTheme({
    palette: {
      primary: { main: color },
      info: { main: color },
    },
  });
};

export default function Layout(props) {
  const location = useLocation();
  const { pathname } = location;
  const theme = getThemeByName(pathname);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
          {pathname.includes('/games/') ? <div /> : <div className={classes.toolbar} />}
        </main>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
