import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { fDate } from 'src/utils/formatTime';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  },
  messageItem: {
    display: 'flex',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(1.5)
    }
  },
  messageBody: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
    marginLeft: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.neutral
  }
}));

// ----------------------------------------------------------------------

Comments.propTypes = {
  post: PropTypes.object,
  className: PropTypes.string
};

function Comments({ post, className }) {
  const classes = useStyles();
  const { comments } = post;

  return (
    <div className={clsx(classes.root, className)}>
      {comments.map((comment) => (
        <div key={comment.id} className={classes.messageItem}>
          <Avatar alt={comment.author.name} src={comment.author.avatarUrl} />
          <div className={classes.messageBody}>
            <Box
              sx={{
                mb: 0.5,
                width: '100%',
                alignItems: 'center',
                display: { sm: 'flex' },
                justifyContent: 'space-between'
              }}
            >
              <Typography variant="subtitle2">{comment.author.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fDate(comment.createdAt)}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {comment.message}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Comments;
