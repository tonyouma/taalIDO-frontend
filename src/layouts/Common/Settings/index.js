import clsx from 'clsx';
import PropTypes from 'prop-types';
import ThemeMode from './ThemeMode';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import ThemeDirection from './ThemeDirection';
import closeFill from '@iconify-icons/eva/close-fill';
import settings2Fill from '@iconify-icons/eva/settings-2-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Drawer, Divider, Typography } from '@material-ui/core';
import { MIconButton } from 'src/theme';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
    zIndex: '1999 !important'
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  }
}));

// ----------------------------------------------------------------------

Settings.propTypes = {
  className: PropTypes.string
};

function Settings({ className }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleCloseSettings = () => {
    setOpen(false);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <MIconButton onClick={handleOpenSettings}>
        <Icon icon={settings2Fill} width={20} height={20} />
      </MIconButton>

      <Drawer
        open={open}
        anchor="right"
        onClose={handleCloseSettings}
        classes={{
          root: classes.drawer,
          paper: classes.drawerPaper
        }}
      >
        <Box
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="subtitle1">Settings</Typography>
          <MIconButton onClick={handleCloseSettings}>
            <Icon icon={closeFill} width={20} height={20} />
          </MIconButton>
        </Box>
        <Divider />

        <Box sx={{ p: 2.5 }}>
          <Typography variant="subtitle2" gutterBottom>
            Mode
          </Typography>
          <ThemeMode />

          <Box sx={{ my: 3 }} />

          <Typography variant="subtitle2" gutterBottom>
            Direction
          </Typography>
          <ThemeDirection />
        </Box>
      </Drawer>
    </div>
  );
}

export default Settings;
