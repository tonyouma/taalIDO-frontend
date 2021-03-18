import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import MailAction from './MailAction';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fDate } from 'src/utils/formatTime';
import createAvatar from 'src/utils/createAvatar';
import starFill from '@iconify-icons/eva/star-fill';
import linkFill from '@iconify-icons/eva/link-fill';
import { Link as RouterLink } from 'react-router-dom';
import starOutline from '@iconify-icons/eva/star-outline';
import roundLabelImportant from '@iconify-icons/ic/round-label-important';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Hidden, Tooltip, Typography } from '@material-ui/core';
import { MAvatar, MLabel, MCheckbox } from 'src/theme';

// ----------------------------------------------------------------------

const linkTo = (params, mailId) => {
  const { systemLabel, customLabel } = params;
  const baseUrl = '/app/mail';
  if (systemLabel) {
    return `${baseUrl}/${systemLabel}/${mailId}`;
  }
  if (customLabel) {
    return `${baseUrl}/label/${customLabel}/${mailId}`;
  }
  return baseUrl;
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    padding: theme.spacing(0, 2),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.neutral,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center'
    },
    '&:hover': {
      zIndex: 999,
      position: 'relative',
      boxShadow: theme.shadows[25].z24,
      '& $actions': { opacity: 1 }
    }
  },
  wrap: {
    minWidth: 0,
    display: 'flex',
    padding: theme.spacing(2, 0),
    transition: theme.transitions.create('padding')
  },
  name: {
    minWidth: 200,
    paddingRight: theme.spacing(2)
  },
  date: {
    flexShrink: 0,
    minWidth: 120,
    textAlign: 'right'
  },
  unread: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    '& $name': { fontWeight: theme.typography.fontWeightBold },
    '& $date': { fontWeight: theme.typography.fontWeightBold },
    '& $subject': { fontWeight: theme.typography.fontWeightBold },
    '& $message': { color: theme.palette.text.secondary }
  },
  isSelected: { backgroundColor: theme.palette.action.selected },
  isDense: { padding: theme.spacing(1, 0) },
  subject: {},
  message: {},
  actions: {}
}));

// ----------------------------------------------------------------------

MailItem.propTypes = {
  mail: PropTypes.object.isRequired,
  isDense: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
  className: PropTypes.string
};

function MailItem({
  mail,
  isDense,
  isSelected,
  onSelect,
  onDeselect,
  className,
  ...other
}) {
  const classes = useStyles();
  const params = useParams();
  const { labels } = useSelector((state) => state.mail);
  const isAttached = mail.files.length > 0;

  const handleChangeCheckbox = (event) =>
    event.target.checked ? onSelect() : onDeselect();

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.unread]: !mail.isUnread,
          [classes.isSelected]: isSelected
        },
        className
      )}
      {...other}
    >
      <Hidden mdDown>
        <Box sx={{ mr: 2, display: 'flex' }}>
          <MCheckbox checked={isSelected} onChange={handleChangeCheckbox} />
          <Tooltip title="Starred">
            <MCheckbox
              color="warning"
              defaultChecked={mail.isStarred}
              icon={<Icon icon={starOutline} />}
              checkedIcon={<Icon icon={starFill} />}
            />
          </Tooltip>
          <Tooltip title="Important">
            <MCheckbox
              color="warning"
              defaultChecked={mail.isImportant}
              checkedIcon={<Icon icon={roundLabelImportant} />}
              icon={<Icon icon={roundLabelImportant} />}
            />
          </Tooltip>
        </Box>
      </Hidden>

      <Link
        color="inherit"
        underline="none"
        component={RouterLink}
        className={clsx(classes.wrap, {
          [classes.isDense]: isDense
        })}
        to={linkTo(params, mail.id)}
      >
        <MAvatar
          alt={mail.from.name}
          src={mail.from.avatar}
          color={createAvatar(mail.from.name).color}
          sx={{ width: 32, height: 32 }}
        >
          {createAvatar(mail.from.name).name}
        </MAvatar>

        <Box
          sx={{
            ml: 2,
            minWidth: 0,
            alignItems: 'center',
            display: { md: 'flex' }
          }}
        >
          <Typography variant="body2" className={classes.name} noWrap>
            {mail.from.name}
          </Typography>

          <Typography noWrap variant="body2" sx={{ pr: 2 }}>
            <span className={classes.subject}>{mail.subject}</span>
            &nbsp;-&nbsp;
            <span className={classes.message}>{mail.message}</span>
          </Typography>

          <Hidden mdDown>
            <Box sx={{ display: 'flex' }}>
              {mail.labelIds.map((labelId) => {
                const label = labels.find((_label) => _label.id === labelId);
                if (!label) return null;
                return (
                  <MLabel
                    key={label.id}
                    sx={{
                      mx: 0.5,
                      textTransform: 'capitalize',
                      backgroundColor: `${label.color} !important`,
                      color: (theme) =>
                        `${theme.palette.getContrastText(
                          label.color
                        )} !important`
                    }}
                  >
                    {label.name}
                  </MLabel>
                );
              })}
            </Box>

            {isAttached && (
              <Box
                component={Icon}
                icon={linkFill}
                sx={{
                  mx: 2,
                  width: 20,
                  height: 20,
                  flexShrink: 0
                }}
              />
            )}
          </Hidden>

          <Typography variant="caption" className={classes.date}>
            {fDate(mail.createdAt)}
          </Typography>
        </Box>
      </Link>

      <MailAction className={classes.actions} />
    </div>
  );
}

export default MailItem;
