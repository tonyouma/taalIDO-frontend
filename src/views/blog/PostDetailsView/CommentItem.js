import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fDate } from 'src/utils/formatTime';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: 'flex-start',
    padding: theme.spacing(3, 0)
  },
  hasReply: {
    marginLeft: 'auto',
    width: `calc(100% - ${theme.spacing(7)})`
  },
  input: {
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  user: PropTypes.object,
  hasReply: PropTypes.bool,
  className: PropTypes.string
};

function CommentItem({ comment, user = {}, hasReply, className, ...other }) {
  const classes = useStyles();
  const [openReply, setOpenReply] = useState(false);
  const { avatarUrl, name, postedAt, message, tagUser } = comment;
  const replyName = user.displayName;
  const replyAvatarUrl = user.avatarUrl;

  const handleOpenReply = () => {
    setOpenReply(true);
  };

  return (
    <>
      <ListItem
        className={clsx(
          classes.root,
          { [classes.hasReply]: hasReply },
          className
        )}
        {...other}
      >
        <ListItemAvatar>
          <Avatar
            alt={name}
            src={avatarUrl || replyAvatarUrl}
            sx={{ width: 48, height: 48 }}
          />
        </ListItemAvatar>

        <ListItemText
          primary={name || replyName}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled'
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                <strong>{tagUser}</strong> {message}
              </Typography>
            </>
          }
        />

        {!hasReply && (
          <Button
            size="small"
            onClick={handleOpenReply}
            sx={{ position: 'absolute', right: 0 }}
          >
            Reply
          </Button>
        )}
      </ListItem>

      {!hasReply && openReply && (
        <Box sx={{ mb: 3 }} className={classes.hasReply}>
          <TextField
            fullWidth
            size="small"
            placeholder="Write comment"
            className={classes.input}
          />
        </Box>
      )}

      <Divider className={classes.hasReply} />
    </>
  );
}

export default CommentItem;
