import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import UserArea from './UserArea';
import { ReactComponent as Logo } from "../../../assets/icon.svg";

import useStyles from './styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SvgIcon from '@material-ui/core/SvgIcon';
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from '@material-ui/core/Drawer';


export default function Header() {
  const [state, setState] = useState({right: false});
  const classes = useStyles();

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({right: open });
  };
  const pageName = 'PAGE_NAME';

  return (
      <AppBar className={classes.appbar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="start page">
            <Link to="/">
            <SvgIcon className={classes.svgicon}  viewBox="0 0 280 250">
              <Logo />
            </SvgIcon>
            </Link>
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {pageName}
          </Typography>
          <Grid className={classes.collapse}>
           <UserArea />
          </Grid>
          <Grid className={classes.smallScreen}>
            <IconButton
            color="inherit"
            aria-label="Menu"
            onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer(false)} >
              <div className={classes.drawer}>
                <div className={classes.iconButton}>
                  <UserArea closeMenu={toggleDrawer(false)} />
                </div>
              </div>
            </Drawer>
          </Grid>
        </Toolbar>
      </AppBar>
  );
}