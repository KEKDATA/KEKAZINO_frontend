import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import GetAppIcon from '@material-ui/icons/GetApp';
import CasinoIcon from '@material-ui/icons/Casino';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import { useHistories } from '@features/useHistories';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export const TemporaryDrawer: React.FC = () => {
  const classes = useStyles();

  const [isActiveDrawer, seDrawerStatus] = React.useState<boolean>(false);

  const { pushToUpload, pushToRoulette } = useHistories();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    seDrawerStatus(b => !b);
  };

  return (
    <>
      <Button
        data-test-id="header-drawer-toggle-button"
        variant="contained"
        color="primary"
        size="medium"
        onClick={toggleDrawer}>
        <MenuIcon data-test-id="drawer-menu-icon" />
      </Button>
      <Drawer
        open={isActiveDrawer}
        data-test-id="drawer"
        onClose={toggleDrawer}>
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}>
          <List>
            <ListItem button key="Upload" onClick={pushToUpload}>
              <ListItemIcon>
                <GetAppIcon />
              </ListItemIcon>
              <ListItemText
                data-test-id="drawer-page-upload"
                primary="Upload"
              />
            </ListItem>
            <ListItem button key="Kekazino" onClick={pushToRoulette}>
              <ListItemIcon>
                <CasinoIcon />
              </ListItemIcon>
              <ListItemText
                data-test-id="drawer-page-kekazino"
                primary="Kekazino"
              />
            </ListItem>
          </List>
          <Divider />
        </div>
      </Drawer>
    </>
  );
};
