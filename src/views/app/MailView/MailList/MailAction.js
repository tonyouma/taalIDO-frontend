import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import trash2Fill from '@iconify-icons/eva/trash-2-fill';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import archiveFill from '@iconify-icons/eva/archive-fill';
import roundMarkEmailRead from '@iconify-icons/ic/round-mark-email-read';
import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: 40,
    zIndex: 99,
    opacity: 0,
    margin: 'auto',
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    top: theme.spacing(1),
    right: theme.spacing(1),
    bottom: theme.spacing(1),
    justifyContent: 'center',
    padding: theme.spacing(0, 0.75),
    boxShadow: theme.shadows[25].z12,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create('opacity')
  }
}));

// ----------------------------------------------------------------------

MailAction.propTypes = {
  handleArchive: PropTypes.func,
  handleDelete: PropTypes.func,
  handleMarkRead: PropTypes.func,
  handleHidden: PropTypes.func,
  className: PropTypes.string
};

function MailAction({
  handleArchive,
  handleDelete,
  handleMarkRead,
  handleHidden,
  className
}) {
  const classes = useStyles();

  const MAIL_ACTIONS = [
    {
      name: 'Archive',
      icon: archiveFill,
      action: handleArchive
    },
    {
      name: 'Delete',
      icon: trash2Fill,
      action: handleDelete
    },
    {
      name: 'Mark Email Read',
      icon: roundMarkEmailRead,
      action: handleMarkRead
    },
    {
      name: 'Hidden Email',
      icon: eyeOffFill,
      action: handleHidden
    }
  ];

  return (
    <div className={clsx(classes.root, className)}>
      {MAIL_ACTIONS.map((action) => (
        <Tooltip key={action.name} title={action.name}>
          <IconButton
            size="small"
            onClick={action.action}
            sx={{
              mx: 0.75,
              '&:hover': {
                color: 'text.primary'
              }
            }}
          >
            <Icon icon={action.icon} width={24} height={24} />
          </IconButton>
        </Tooltip>
      ))}
    </div>
  );
}

export default MailAction;
