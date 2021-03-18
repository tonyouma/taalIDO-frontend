import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify-icons/eva/pin-fill';
import phoneFill from '@iconify-icons/eva/phone-fill';
import emailFill from '@iconify-icons/eva/email-fill';
import { DialogAnimate } from 'src/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, DialogContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1.5)
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

// ----------------------------------------------------------------------

PopupInfo.propTypes = {
  participant: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string
};

function PopupInfo({ participant, isOpen, onClose, className, ...other }) {
  const classes = useStyles();
  const { name, avatar, position, address, phone, email } = participant;

  return (
    <DialogAnimate
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
      className={clsx(classes.root, className)}
      {...other}
    >
      <DialogContent sx={{ pb: 5, textAlign: 'center' }}>
        <Avatar
          alt={name}
          src={avatar}
          sx={{
            mt: 5,
            mb: 2,
            mx: 'auto',
            width: 96,
            height: 96
          }}
        />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
          {position}
        </Typography>

        <div className={classes.row}>
          <Icon icon={pinFill} className={classes.icon} />
          <Typography variant="body2">{address}</Typography>
        </div>
        <div className={classes.row}>
          <Icon icon={phoneFill} className={classes.icon} />
          <Typography variant="body2">{phone}</Typography>
        </div>
        <div className={classes.row}>
          <Icon icon={emailFill} className={classes.icon} />
          <Typography variant="body2">{email}</Typography>
        </div>
      </DialogContent>
    </DialogAnimate>
  );
}

export default PopupInfo;
