import clsx from 'clsx';
import PropTypes from 'prop-types';
import ThemeMode from './ThemeMode';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import closeFill from '@iconify-icons/eva/close-fill';
import settings2Fill from '@iconify-icons/eva/settings-2-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Drawer, Divider, Typography } from '@material-ui/core';
import { MIconButton } from 'src/theme';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

const useStyles = makeStyles((theme) => ({
  root: {},
  drawer: {
    zIndex: '1999 !important'
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  },
  isHome: {
    color: theme.palette.text.primary
  },
  isDesktopActive: {
    color: theme.palette.primary.black,
    border: '1px solid black'
  }
}));

// ----------------------------------------------------------------------

Settings.propTypes = {
  className: PropTypes.string
};

function Settings({ className, landingPage }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const handleOpenSettings = () => {
    setOpen(true);
  };

  const handleCloseSettings = () => {
    setOpen(false);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <MIconButton onClick={handleOpenSettings}>
        {landingPage === true ? (
          <Icon
            className={clsx({
              [classes.isHome]: isHome
            })}
            icon={settings2Fill}
            width={23}
            height={23}
          />
        ) : (
          <Icon icon={settings2Fill} width={23} height={23} />
        )}
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

          {/* <Typography variant="subtitle2" gutterBottom>
            Direction
          </Typography>
          <ThemeDirection /> */}
        </Box>
      </Drawer>
    </div>
  );
}
export default Settings;
