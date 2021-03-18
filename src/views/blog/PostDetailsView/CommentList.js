import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

CommentList.propTypes = {
  post: PropTypes.object.isRequired,
  className: PropTypes.string
};

function CommentList({ post, className }) {
  const classes = useStyles();
  const { comments } = post;

  return (
    <List disablePadding className={clsx(classes.root, className)}>
      {comments.map((comment) => {
        const { id, replyComment, users } = comment;
        const hasReply = replyComment.length > 0;

        return (
          <Box key={id} sx={{}}>
            <CommentItem comment={comment} />
            {hasReply &&
              replyComment.map((comment) => {
                const user = users.find((_user) => _user.id === comment.userId);
                return (
                  <CommentItem
                    key={comment.id}
                    user={user}
                    comment={comment}
                    hasReply={hasReply}
                  />
                );
              })}
          </Box>
        );
      })}
    </List>
  );
}

export default CommentList;
