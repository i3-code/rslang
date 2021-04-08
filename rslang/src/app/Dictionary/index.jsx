import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Page from './Page';

import {deletedWords, hardWords, learnedWords} from '../../redux/appSlice';

import useStyles from './styles';
import { useSelector } from 'react-redux';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function SimpleTabs() {
  const learnedWordsList = useSelector(learnedWords);
  const deletedWordsList = useSelector(deletedWords);
  const hardWordsList = useSelector(hardWords);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Изучаемые слова" />
          <Tab label="Сложные слова" />
          <Tab label="Удалённые слова" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
        <Page words={learnedWordsList}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Page words={hardWordsList}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Page words={deletedWordsList}/>
      </TabPanel>
    </div>
  );
}
