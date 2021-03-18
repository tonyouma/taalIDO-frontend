import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import fileFill from '@iconify-icons/eva/file-fill';
import starFill from '@iconify-icons/eva/star-fill';
import roundSend from '@iconify-icons/ic/round-send';
import emailFill from '@iconify-icons/eva/email-fill';
import inboxFill from '@iconify-icons/eva/inbox-fill';
import shareFill from '@iconify-icons/eva/share-fill';
import roundLabel from '@iconify-icons/ic/round-label';
import roundForum from '@iconify-icons/ic/round-forum';
import { NavLink as RouterLink } from 'react-router-dom';
import trash2Fill from '@iconify-icons/eva/trash-2-fill';
import roundReport from '@iconify-icons/ic/round-report';
import roundLabelImportant from '@iconify-icons/ic/round-label-important';
import { makeStyles } from '@material-ui/core/styles';
import {
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';

// ----------------------------------------------------------------------

const LABEL_ICONS = {
  all: emailFill,
  inbox: inboxFill,
  trash: trash2Fill,
  drafts: fileFill,
  spam: roundReport,
  sent: roundSend,
  starred: starFill,
  important: roundLabelImportant,
  id_social: shareFill,
  id_promotions: roundLabel,
  id_forums: roundForum
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    ...theme.typography.body2,
    textTransform: 'capitalize',
    padding: theme.spacing(0, 3),
    color: theme.palette.text.secondary
  },
  listItemIcon: { color: 'inherit' },
  isActive: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.action.selected
  }
}));

const linkTo = (label) => {
  const baseUrl = '/app/mail';
  if (label.type === 'system') {
    return `${baseUrl}/${label.id}`;
  }
  if (label.type === 'custom') {
    return `${baseUrl}/label/${label.name}`;
  }
  return baseUrl;
};

// ----------------------------------------------------------------------

LabelItem.propTypes = {
  label: PropTypes.object.isRequired,
  className: PropTypes.string
};

function LabelItem({ label, className, ...other }) {
  const classes = useStyles();
  const isUnread = label.unreadCount > 0;

  return (
    <ListItem
      button
      to={linkTo(label)}
      component={RouterLink}
      className={clsx(classes.root, className)}
      activeClassName={classes.isActive}
      {...other}
    >
      <ListItemIcon className={classes.listItemIcon}>
        <Icon
          icon={LABEL_ICONS[label.id]}
          style={{ color: label.color }}
          width={24}
          height={24}
        />
      </ListItemIcon>

      <ListItemText disableTypography primary={label.name} />

      {isUnread && (
        <Typography variant="caption">{label.unreadCount}</Typography>
      )}
    </ListItem>
  );
}

export default LabelItem;
