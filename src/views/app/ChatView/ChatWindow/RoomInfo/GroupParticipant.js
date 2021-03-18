import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import PopupInfo from './PopupInfo';
import { Icon } from '@iconify/react';
import Scrollbars from 'src/components/Scrollbars';
import BadgeStatus from 'src/components/BadgeStatus';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify-icons/eva/arrow-ios-downward-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  List,
  Avatar,
  Button,
  Collapse,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

// ----------------------------------------------------------------------

const HEIGHT = 64;

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    height: HEIGHT,
    padding: theme.spacing(0, 2.5)
  },
  collapseButton: {
    ...theme.typography.overline,
    height: 40,
    borderRadius: 0,
    padding: theme.spacing(1, 2),
    justifyContent: 'space-between',
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

function Participant({ participant, isOpen, onClosePopup, onShowPopup }) {
  const classes = useStyles();
  const { name, avatar, status, position } = participant;

  return (
    <>
      <ListItem
        button
        disableGutters
        className={classes.listItem}
        onClick={onShowPopup}
      >
        <ListItemAvatar>
          <Box sx={{ position: 'relative', width: 40, height: 40 }}>
            <Avatar alt={name} src={avatar} />
            <BadgeStatus
              status={status}
              sx={{ right: 0, bottom: 0, position: 'absolute' }}
            />
          </Box>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={position}
          primaryTypographyProps={{ variant: 'subtitle2', noWrap: true }}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItem>
      <PopupInfo
        participant={participant}
        isOpen={isOpen}
        onClose={onClosePopup}
      />
    </>
  );
}

GroupParticipant.propTypes = {
  participants: PropTypes.array.isRequired,
  selectUserId: PropTypes.string,
  onShowPopupUserInfo: PropTypes.func,
  isCollapse: PropTypes.bool,
  onCollapse: PropTypes.func,
  className: PropTypes.string
};

function GroupParticipant({
  participants,
  selectUserId,
  onShowPopupUserInfo,
  isCollapse,
  onCollapse,
  className,
  ...other
}) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Button
        fullWidth
        disableRipple
        color="inherit"
        className={classes.collapseButton}
        onClick={onCollapse}
        endIcon={
          <Icon
            icon={isCollapse ? arrowIosDownwardFill : arrowIosForwardFill}
            width={16}
            height={16}
          />
        }
      >
        In room ({participants.length})
      </Button>

      <Box sx={{ height: isCollapse ? HEIGHT * 4 : 0, overflow: 'hidden' }}>
        <Scrollbars>
          <Collapse in={isCollapse}>
            <List disablePadding>
              {participants.map((participant) => (
                <Participant
                  key={participant.id}
                  participant={participant}
                  isOpen={selectUserId === participant.id}
                  onShowPopup={() => onShowPopupUserInfo(participant.id)}
                  onClosePopup={() => onShowPopupUserInfo(null)}
                />
              ))}
            </List>
          </Collapse>
        </Scrollbars>
      </Box>
    </div>
  );
}

export default GroupParticipant;
