import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify-icons/eva/pin-fill';
import phoneFill from '@iconify-icons/eva/phone-fill';
import emailFill from '@iconify-icons/eva/email-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  Button,
  Divider,
  Collapse,
  Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: 'flex',
    margin: theme.spacing(1.5, 0)
  },
  itemIcon: {
    width: 16,
    height: 16,
    marginTop: 4,
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  itemText: {
    flexGrow: 1,
    maxWidth: 160,
    wordWrap: 'break-word'
  },
  button: {
    ...theme.typography.overline,
    height: 40,
    borderRadius: 0,
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

OneParticipant.propTypes = {
  participants: PropTypes.array.isRequired,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  className: PropTypes.string
};

function OneParticipant({
  participants,
  isCollapse,
  onCollapse,
  className,
  ...other
}) {
  const classes = useStyles();
  const participant = [...participants][0];

  if (participant === undefined) {
    return null;
  }

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Box
        sx={{
          pt: 4,
          pb: 3,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <Avatar
          alt={participant.name}
          src={participant.avatar}
          sx={{ width: 96, height: 96 }}
        />
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">{participant.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {participant.position}
          </Typography>
        </Box>
      </Box>

      <Divider />

      <Button
        fullWidth
        color="inherit"
        onClick={onCollapse}
        className={classes.button}
        endIcon={
          <Icon
            icon={isCollapse ? arrowIosDownwardFill : arrowIosForwardFill}
            width={16}
            height={16}
          />
        }
      >
        information
      </Button>

      <Collapse in={isCollapse}>
        <Box sx={{ px: 2.5, pb: 1 }}>
          <div className={classes.item}>
            <Icon icon={pinFill} className={classes.itemIcon} />
            <Typography variant="body2" className={classes.itemText}>
              {participant.address}
            </Typography>
          </div>
          <div className={classes.item}>
            <Icon icon={phoneFill} className={classes.itemIcon} />
            <Typography variant="body2" className={classes.itemText}>
              {participant.phone}
            </Typography>
          </div>
          <div className={classes.item}>
            <Icon icon={emailFill} className={classes.itemIcon} />
            <Typography variant="body2" className={classes.itemText}>
              {participant.email}
            </Typography>
          </div>
        </Box>
      </Collapse>
    </div>
  );
}

export default OneParticipant;
