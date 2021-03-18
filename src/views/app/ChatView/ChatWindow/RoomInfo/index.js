import clsx from 'clsx';
import PropTypes from 'prop-types';
import Attachment from './Attachment';
import { Icon } from '@iconify/react';
import OneParticipant from './OneParticipant';
import GroupParticipant from './GroupParticipant';
import React, { useState, useEffect } from 'react';
import useBreakpoints from 'src/hooks/useBreakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { onCloseSidebarInfo, onOpenSidebarInfo } from 'src/redux/slices/chat';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: 240,
    flexShrink: 0,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    borderLeft: `solid 1px ${theme.palette.divider}`,
    transition: theme.transitions.create('width')
  },
  toggleButton: {
    borderRight: 0,
    display: 'flex',
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'center',
    top: theme.spacing(1),
    left: theme.spacing(-4),
    width: theme.spacing(4),
    height: theme.spacing(4),
    justifyContent: 'center',
    boxShadow: theme.shadows[25].z8,
    border: `solid 1px ${theme.palette.divider}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: theme.shape.borderRadius
  },
  hideSidebar: {
    width: 0,
    '& > *': { overflow: 'hidden' }
  }
}));

// ----------------------------------------------------------------------

RoomInfo.propTypes = {
  conversation: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  className: PropTypes.string
};

function RoomInfo({ conversation, participants, className, ...other }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(true);
  const [selectUser, setSelectUser] = useState(null);
  const [showAttachment, setShowAttachment] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const { isOpenSidebarInfo } = useSelector((state) => state.chat);
  const isMoblie = useBreakpoints('down', 'lg');
  const isGroup = participants.length > 1;

  useEffect(() => {
    if (isMoblie) return dispatch(onCloseSidebarInfo());
    return dispatch(onOpenSidebarInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoblie]);

  const handleToggleSidebar = () => {
    if (isOpenSidebarInfo) {
      return dispatch(onCloseSidebarInfo());
    }
    return dispatch(onOpenSidebarInfo());
  };

  return (
    <div
      className={clsx(
        classes.root,
        { [classes.hideSidebar]: !isOpenSidebarInfo },
        className
      )}
      {...other}
    >
      <div className={classes.toggleButton}>
        <IconButton onClick={handleToggleSidebar}>
          <Icon
            width={16}
            height={16}
            icon={isOpenSidebarInfo ? arrowIosForwardFill : arrowIosBackFill}
          />
        </IconButton>
      </div>

      {isGroup ? (
        <GroupParticipant
          selectUserId={selectUser}
          participants={participants}
          isCollapse={showParticipants}
          onShowPopupUserInfo={(participantId) => setSelectUser(participantId)}
          onCollapse={() => setShowParticipants((prev) => !prev)}
        />
      ) : (
        <OneParticipant
          participants={participants}
          isCollapse={showInfo}
          onCollapse={() => setShowInfo((prev) => !prev)}
        />
      )}
      <Divider />

      <Attachment
        conversation={conversation}
        isCollapse={showAttachment}
        onCollapse={() => setShowAttachment((prev) => !prev)}
      />
    </div>
  );
}

export default RoomInfo;
