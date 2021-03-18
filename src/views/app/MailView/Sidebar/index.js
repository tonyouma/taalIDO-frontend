import clsx from 'clsx';
import LabelItem from './LabelItem';
import { Icon } from '@iconify/react';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Scrollbars from 'src/components/Scrollbars';
import plusFill from '@iconify-icons/eva/plus-fill';
import { useDispatch, useSelector } from 'react-redux';
import { closeSidebar, openCompose } from 'src/redux/slices/mail';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, Drawer, Hidden, Button, Divider } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {},
  drawerPaper: {
    width: 280
  },
  drawerPaperDesktop: {
    position: 'relative'
  }
}));

function Sidebar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { labels, isOpenSidebar } = useSelector((state) => state.mail);

  useEffect(() => {
    if (isOpenSidebar) {
      dispatch(closeSidebar());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };

  const handleOpenCompose = () => {
    handleCloseSidebar();
    dispatch(openCompose());
  };

  const renderContent = (
    <Scrollbars>
      <Box sx={{ p: 3 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Icon icon={plusFill} />}
          onClick={handleOpenCompose}
        >
          Compose
        </Button>
      </Box>

      <Divider />

      <List disablePadding>
        {labels.map((label) => (
          <LabelItem key={label.id} label={label} />
        ))}
      </List>
    </Scrollbars>
  );

  return (
    <>
      <Hidden mdUp>
        <Drawer
          variant="temporary"
          open={isOpenSidebar}
          onClose={handleCloseSidebar}
          classes={{ paper: classes.drawerPaper }}
          ModalProps={{ keepMounted: true }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, classes.drawerPaperDesktop)
          }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
