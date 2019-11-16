import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

export const BottomNav = () => {
  let location = useLocation();
  let history = useHistory();
  return (
    <BottomNavigation
      value={location.pathname}
      onChange={(event, newValue) => {
        history.push(`/${newValue}`);
      }}
      showLabels
    >
      <BottomNavigationAction value="" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction
        value="plan"
        label="Plan"
        icon={<LocalAtmIcon />}
      />
    </BottomNavigation>
  );
};
