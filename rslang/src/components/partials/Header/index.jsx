import React from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AssessmentIcon from '@material-ui/icons/Assessment';

import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

import UserArea from './UserArea';

import useStyles from './styles';

const mainIcons = {
  '/': ['Главная', <HomeIcon />],
  '/book': ['Учебник', <LibraryBooksIcon />],
  '/games': ['Игры', <SportsEsportsIcon />],
  '/stats': ['Статистика', <AssessmentIcon />],
};

const additionalIcons = {
  '/settings': ['Настройки', <SettingsIcon />],
  '/about': ['О проекте', <InfoIcon />],
};

const getNameByPath = (path) => {
  return mainIcons[path] || additionalIcons[path] || ['404'];
};

export default function Header() {
  const location = useLocation();
  const [pageName, setPageName] = React.useState(getNameByPath(location.pathname));

  React.useEffect(() => {
    setPageName(getNameByPath(location.pathname));
  }, [location]);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Grid>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid container alignItems="center" className={classes.pageTitle}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {pageName[0]}
              </Typography>
            </Grid>
            <UserArea />
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {Object.entries(mainIcons).map(([link, [text, icon]]) => (
            <NavLink
              key={text}
              to={link}
              className={classes.link}
              activeClassName={classes.selected}
              exact={true}
              replace={true}
            >
              <ListItem button>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
        <List>
          {Object.entries(additionalIcons).map(([link, [text, icon]]) => (
            <NavLink
              key={text}
              to={link}
              className={classes.link}
              activeClassName={classes.selected}
              exact={true}
              replace={true}
            >
              <ListItem button>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </Drawer>
    </Grid>
  );
}
