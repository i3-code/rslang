import React from 'react';
import Typography from '@material-ui/core/Typography';
import {Table, TableBody, TableContainer, TableHead, TableRow }from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { StyledTableCell, StyledTableRow, useStyles } from './style';
import './style.css';

function createData(games, numbers, rightAnswers, lengthOfRightAnswers) {
  return { games, numbers, rightAnswers, lengthOfRightAnswers };
}

function createDataTotal(rightAnswersTotal, percentTotal) {
  return { rightAnswersTotal, percentTotal };
}

const rows = [
  createData('Саванна', 6.0, 24, 4.0),
  createData('Аудиовызов', 9.0, 37, 4.3),
  createData('Спринт', 16.0, 24, 6.0),
  createData('Своя игра', 3.7, 67, 4.3),
];

const rowsTotal = [
  createDataTotal( 6.0, 24),
];

export default function DayStat() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" className={classes.title}>Статистика за день</Typography>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Игры</StyledTableCell>
              <StyledTableCell align="right">Количество изученных слов</StyledTableCell>
              <StyledTableCell align="right">Процент правильных ответов</StyledTableCell>
              <StyledTableCell align="right">Самая длинная серия правильных ответов</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.games}>
                <StyledTableCell component="th" scope="row">
                  {row.games}
                </StyledTableCell>
                <StyledTableCell align="right">{row.numbers}</StyledTableCell>
                <StyledTableCell align="right">{row.rightAnswers}</StyledTableCell>
                <StyledTableCell align="right">{row.lengthOfRightAnswers}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper} className={classes.tableTotal}>
        <Table >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Общее количество изученных слов</StyledTableCell>
              <StyledTableCell align="center">Процент правильных ответов</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsTotal.map((row) => (
              <StyledTableRow key={row.rightAnswersTotal}>
                <StyledTableCell align="center" >{row.rightAnswersTotal}</StyledTableCell>
                <StyledTableCell align="center">{row.percentTotal}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
