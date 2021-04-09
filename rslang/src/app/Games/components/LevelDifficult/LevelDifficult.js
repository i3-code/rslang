import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import useStyles from './styles';

export default function FormControlLabelPlacement({ setLevel, color = '#f9f53e' }) {
  const classes = useStyles();

  const changeLevel = (e) => {
    setLevel(e.target.value - 1);
  };

  return (
    <FormControl className={classes.wrapper} component="fieldset">
      <FormLabel className={classes.chooseLevel} style={{ color }} component="legend">
        Выберите уровень сложности:
      </FormLabel>
      <RadioGroup
        className={classes.numberLevel}
        style={{ color }}
        row
        aria-label="position"
        name="position"
        defaultValue="1"
      >
        <FormControlLabel
          control={<Radio color="default" style={{ color }} className={classes.numberLevel} />}
          label="1"
          labelPlacement="top"
          value="1"
          onClick={(e) => changeLevel(e)}
        />
        <FormControlLabel
          value="2"
          control={<Radio color="default" style={{ color }} className={classes.numberLevel} />}
          label="2"
          labelPlacement="top"
          onClick={(e) => changeLevel(e)}
        />
        <FormControlLabel
          value="3"
          control={<Radio color="default" style={{ color }} className={classes.numberLevel} />}
          label="3"
          labelPlacement="top"
          onClick={(e) => changeLevel(e)}
        />
        <FormControlLabel
          value="4"
          control={<Radio color="default" style={{ color }} className={classes.numberLevel} />}
          label="4"
          labelPlacement="top"
          onClick={(e) => changeLevel(e)}
        />
        <FormControlLabel
          value="5"
          control={<Radio color="default" style={{ color }} className={classes.numberLevel} />}
          label="5"
          labelPlacement="top"
          onClick={(e) => changeLevel(e)}
        />
        <FormControlLabel
          value="6"
          control={<Radio color="default" style={{ color }} className={classes.numberLevel} />}
          label="6"
          labelPlacement="top"
          onClick={(e) => changeLevel(e)}
        />
      </RadioGroup>
    </FormControl>
  );
}
