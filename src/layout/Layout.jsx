import React from 'react';
import { BottomNav } from './BottomNav';
import { AppBar, Box, Paper, makeStyles } from '@material-ui/core';

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
      <Box p={1} className={classes.paper}>
        {children}
      </Box>
      <AppBar color="primary" className={classes.appBar}>
        <BottomNav />
      </AppBar>
    </>
  );
};
