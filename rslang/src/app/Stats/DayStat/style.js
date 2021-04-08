import { withStyles, makeStyles } from '@material-ui/core/styles';
import {TableCell, TableRow }from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  table: {
    maxWidth: 1400,
    margin: '0 auto',
  },
  tableTotal: {
    maxWidth: 600,
    margin: '0 auto',
    marginTop: 15,
    marginBottom: 30,
  },
  title: {
    [theme.breakpoints.down('sm')]: {
     fontSize: 26,
    },
  }
}));

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

