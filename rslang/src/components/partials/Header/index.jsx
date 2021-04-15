import React from 'react';

import { NavLink, useLocation} from 'react-router-dom';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Grid, Tooltip } from '@material-ui/core';
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
import BookIcon from '@material-ui/icons/Book';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import AssessmentIcon from '@material-ui/icons/Assessment';

import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

import UserArea from './UserArea';

import useStyles from './styles';

const mainIcons = {
  '/': ['Главная', <HomeIcon />],
  '/book': ['Учебник', <MenuBookIcon />],
  '/dictionary': ['Словарь', <BookIcon />],
  '/games': ['Игры', <SportsEsportsIcon />],
  '/stats': ['Статистика', <AssessmentIcon />],
};

const additionalIcons = {
  '/settings': ['Настройки', <SettingsIcon />],
  '/about': ['О проекте', <InfoIcon />],
};

const getNameByPath = (path) => {
  let name = path.slice(0, path.lastIndexOf('/')) || path;
  if (name.includes('games')) name = '/games';
  return mainIcons[name] || additionalIcons[name] || ['404'];
};

const generateList = (iconsArray, path, classes) =>{
  return (
    <List>
      {Object.entries(iconsArray).map(([link, [text, icon]]) => {
        const selected = (path === getNameByPath(link));
        return (
          <NavLink
            key={text}
            to={link}
            className={classes.link}
            activeClassName={classes.selected}
            exact={true}
            replace={selected}
          >
              <ListItem button selected={selected}>
                <Tooltip title={text} placement="right" arrow>
                  <ListItemIcon className={selected ? classes.selected : ''}>{icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={text} />
              </ListItem>
          </NavLink>
      )})}
    </List>
  );
};

export default function Header() {
  const location = useLocation();
  const path = getNameByPath(location.pathname);
  const [pageName, setPageName] = React.useState(path);

  React.useEffect(() => {
    setPageName(path);
  }, [path]);

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
        {generateList(mainIcons, path, classes)}
        <Divider />
        {generateList(additionalIcons, path, classes)}
      </Drawer>
    </Grid>
  );
}
