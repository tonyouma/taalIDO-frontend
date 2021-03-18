import clsx from 'clsx';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { QuillEditor } from 'src/components/Editor';
import { closeCompose } from 'src/redux/slices/mail';
import useBreakpoints from 'src/hooks/useBreakpoints';
import closeFill from '@iconify-icons/eva/close-fill';
import { useDispatch, useSelector } from 'react-redux';
import expandFill from '@iconify-icons/eva/expand-fill';
import attach2Fill from '@iconify-icons/eva/attach-2-fill';
import collapseFill from '@iconify-icons/eva/collapse-fill';
import roundAddPhotoAlternate from '@iconify-icons/ic/round-add-photo-alternate';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Input,
  Button,
  Divider,
  Backdrop,
  IconButton,
  Typography,
  Portal
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    right: 0,
    bottom: 0,
    zIndex: 1999,
    minHeight: 440,
    outline: 'none',
    display: 'flex',
    position: 'fixed',
    overflow: 'hidden',
    flexDirection: 'column',
    margin: theme.spacing(3),
    boxShadow: theme.shadows[25].z20,
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.paper
  },
  fullScreen: {
    top: 0,
    left: 0,
    zIndex: 1999,
    margin: 'auto',
    width: `calc(100% - ${theme.spacing(3)})`,
    height: `calc(100% - ${theme.spacing(3)})`,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${theme.spacing(10)})`,
      height: `calc(100% - ${theme.spacing(10)})`
    }
  },
  input: {
    padding: theme.spacing(0.5, 3),
    borderBottom: `solid 1px ${theme.palette.divider}`
  },
  editor: { border: 'none', flexGrow: 1 },
  backdrop: { zIndex: 1998 }
}));

// ----------------------------------------------------------------------

function Compose() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpenCompose } = useSelector((state) => state.mail);
  const [fullScreen, setFullScreen] = useState(false);
  const [message, setMessage] = useState('');
  const isMobile = useBreakpoints('down', 'sm');

  const handleChangeMessage = (value) => {
    setMessage(value);
  };

  const handleExitFullScreen = () => {
    setFullScreen(false);
  };

  const handleEnterFullScreen = () => {
    setFullScreen(true);
  };

  const handleClose = () => {
    dispatch(closeCompose());
    setFullScreen(false);
  };

  if (!isOpenCompose) {
    return null;
  }

  return (
    <Portal>
      <Backdrop className={classes.backdrop} open={fullScreen || isMobile} />
      <div
        className={clsx(classes.root, {
          [classes.fullScreen]: fullScreen
        })}
      >
        <Box
          sx={{
            pl: 3,
            pr: 1,
            height: 60,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">New Message</Typography>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            onClick={fullScreen ? handleExitFullScreen : handleEnterFullScreen}
          >
            <Icon
              icon={fullScreen ? collapseFill : expandFill}
              width={20}
              height={20}
            />
          </IconButton>

          <IconButton onClick={handleClose}>
            <Icon icon={closeFill} width={20} height={20} />
          </IconButton>
        </Box>

        <Divider />

        <Input disableUnderline placeholder="To" className={classes.input} />

        <Input
          disableUnderline
          placeholder="Subject"
          className={classes.input}
        />

        <QuillEditor
          simple
          id="compose-mail"
          value={message}
          onChange={handleChangeMessage}
          placeholder="Type a message"
          className={classes.editor}
        />

        <Divider />

        <Box sx={{ py: 2, px: 3, display: 'flex', alignItems: 'center' }}>
          <Button variant="contained">Send</Button>

          <IconButton size="small" sx={{ ml: 2, mr: 1 }}>
            <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
          </IconButton>

          <IconButton size="small">
            <Icon icon={attach2Fill} width={24} height={24} />
          </IconButton>
        </Box>
      </div>
    </Portal>
  );
}

export default Compose;
