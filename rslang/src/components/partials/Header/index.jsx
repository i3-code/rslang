import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import { Grid } from "@material-ui/core";
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

import useStyles from './styles';
import { NavLink } from 'react-router-dom';

const mainIcons = [
  ['Главная', <HomeIcon />, '/'],
  ['Учебник', <LibraryBooksIcon />, '/book'],
  ['Игры', <SportsEsportsIcon />, '/games'],
  ['Статистика', <AssessmentIcon />, '/stats'],
]

const additionalIcons = [
  ['Настройки', <SettingsIcon />, '/settings'],
  ['О проекте', <InfoIcon />, '/about'],
];

export default function Header() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Grid>
      <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      >
      <Toolbar>
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
          Главная
        </Typography>
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
        {mainIcons.map(([text, icon, link], index) => (
          <NavLink to={link} className={classes.link} activeClassName={classes.selected} exact={true}>
            <ListItem button key={text}>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {additionalIcons.map(([text, icon, link], index) => (
          <NavLink to={link} className={classes.link} activeClassName={classes.selected} exact={true}>
            <ListItem button key={text}>
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
