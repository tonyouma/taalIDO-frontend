import clsx from 'clsx';
import React from 'react';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  className: PropTypes.string
};

function PostList({ posts, className }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={clsx(classes.root, className)}>
      {posts.map((post, index) => (
        <PostItem key={post.id} post={post} index={index} />
      ))}
    </Grid>
  );
}

export default PostList;
