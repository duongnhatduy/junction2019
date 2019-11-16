import React from 'react';
import { BottomNav } from './BottomNav';
import { AppBar, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0
  },
  paper: {
    paddingBottom: 70
  }
}));

export const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <Paper square className={classes.paper}>
        {children}
      </Paper>
      <AppBar color="primary" className={classes.appBar}>
        <BottomNav />
      </AppBar>
    </>
  );
};
