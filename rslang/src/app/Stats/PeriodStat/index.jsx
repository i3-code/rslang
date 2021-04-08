import React from 'react';
import Typography from '@material-ui/core/Typography';
import DailyPeriodStat from './DailyPeriodStat/index.jsx';
import CumulativePeriodStat from './CumulativePeriodStat/index.jsx';
import { useStyles } from '../style';


export default function PeriodStat() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h4" gutterBottom className={classes.title}>Статистика за весь период</Typography>
      <Typography gutterBottom align='center'>Количество изученных слов в день</Typography>
      <DailyPeriodStat/>
      <Typography gutterBottom align='center'>Количество изученных слов с нарастающим итогом</Typography>
      <CumulativePeriodStat/>
    </div>
  );
}
