import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { translate, setTranslate, controls, setControls } from '../Book/bookSlice'

export default function SwitchesGroup() {
  const [state, setState] = useState({
    translate: useSelector(translate),
    controls: useSelector(controls),
  });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name } = event.target;
    setState({ ...state, [name]: event.target.checked });
    const dispatchCallBack = ( name === 'translate') ? setTranslate : setControls;
    dispatch(dispatchCallBack(event.target.checked));
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Настройки учебника</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={state.translate} onChange={handleChange} name="translate" />}
          label="Отображать перевод"
        />
        <FormControlLabel
          control={<Switch checked={state.controls} onChange={handleChange} name="controls" />}
          label="Отображать действия"
        />
      </FormGroup>
    </FormControl>
  );
}
