import React from 'react'
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import useStyles from "../../styles";

const Layout = (props) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Header/>
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          {props.children}
        </main>
      </div>
      <Footer/>
    </>
  )
}

export default Layout
