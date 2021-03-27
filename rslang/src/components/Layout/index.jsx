import React from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import useStyles from '../../styles';

export default function Layout(props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
          <div className={classes.toolbar} />
        </main>
      </div>
      <Footer />
    </>
  );
}
