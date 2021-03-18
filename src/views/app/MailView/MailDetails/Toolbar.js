import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import createAvatar from 'src/utils/createAvatar';
import { Link, Typography } from '@material-ui/core';
import { fDateTimeSuffix } from 'src/utils/formatTime';
import roundReply from '@iconify-icons/ic/round-reply';
import { useHistory, useParams } from 'react-router-dom';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Hidden, Tooltip, IconButton } from '@material-ui/core';
import { MAvatar } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    height: 84,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    justifyContent: 'space-between'
  },
  icon: {
    width: 20,
    height: 20
  }
}));

// ----------------------------------------------------------------------

Toolbar.propTypes = {
  mail: PropTypes.object,
  className: PropTypes.string
};

function Toolbar({ mail, className, ...other }) {
  const classes = useStyles();
  const history = useHistory();
  const { systemLabel, customLabel } = useParams();

  const handleBack = () => {
    if (systemLabel) {
      return history.push(`/app/mail/${systemLabel}`);
    }
    if (customLabel) {
      return history.push(`/app/mail/label/${customLabel}`);
    }
    return history.push('/app/mail/inbox');
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title="Back">
          <IconButton onClick={handleBack}>
            <Icon icon={arrowIosBackFill} className={classes.icon} />
          </IconButton>
        </Tooltip>

        <MAvatar
          alt={mail.from.name}
          src={mail.from.avatar}
          color={createAvatar(mail.from.name).color}
        >
          {createAvatar(mail.from.name).name}
        </MAvatar>

        <Box sx={{ ml: 2 }}>
          <Typography display="inline" variant="subtitle2">
            {mail.from.name}
          </Typography>
          <Link variant="caption" sx={{ color: 'text.secondary' }}>
            &nbsp; {`<${mail.from.email}>`}
          </Link>
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            To:&nbsp;
            {mail.to.map((person) => (
              <Link color="inherit" key={person.email}>
                {person.email}
              </Link>
            ))}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Hidden smDown>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {fDateTimeSuffix(mail.createdAt)}
          </Typography>
          <Tooltip title="Reply">
            <IconButton>
              <Icon icon={roundReply} className={classes.icon} />
            </IconButton>
          </Tooltip>
        </Hidden>
        <Tooltip title="More options">
          <IconButton>
            <Icon icon={moreVerticalFill} className={classes.icon} />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
}

export default Toolbar;
