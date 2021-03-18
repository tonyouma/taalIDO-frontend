import { orderBy } from 'lodash';
import PostList from './PostList';
import SortPosts from './SortPosts';
import SearchPost from './SearchPost';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import { PATH_APP } from 'src/routes/paths';
import plusFill from '@iconify-icons/eva/plus-fill';
import { HeaderDashboard } from 'src/layouts/Common';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import roundPostAdd from '@iconify-icons/ic/round-post-add';
import InfinitScroll from 'react-infinite-scroll-component';
import React, { useEffect, useCallback, useState } from 'react';
import { getPostsInitial, getMorePosts } from 'src/redux/slices/blog';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Hidden,
  Button,
  Skeleton,
  Container
} from '@material-ui/core';
import { MFab } from 'src/theme';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' }
];

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

const applySort = (posts, sortBy) => {
  if (sortBy === 'latest') {
    posts = orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    posts = orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    posts = orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

const SkeletonLoad = (
  <Box sx={{ mt: 2 }}>
    <Grid container spacing={3}>
      {[...Array(4)].map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Skeleton
            variant="rectangular"
            width="100%"
            sx={{ height: 200, borderRadius: 2 }}
          />
          <Box sx={{ display: 'flex', mt: 1.5 }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

function BlogView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState('latest');
  const { posts, hasMore, index, step } = useSelector((state) => state.blog);

  const sortedPosts = applySort(posts, filters);
  const onScroll = useCallback(() => dispatch(getMorePosts()), [dispatch]);

  useEffect(() => {
    dispatch(getPostsInitial(index, step));
  }, [dispatch, index, step]);

  const handleChangeSort = (event) => {
    setFilters(event.target.value);
  };

  return (
    <Page title="Blog-Management | Minimal-UI" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading="Blog"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'Blog' }
          ]}
          action={
            <Hidden smDown>
              <Button
                variant="contained"
                component={RouterLink}
                to={PATH_APP.management.blog.newPost}
                startIcon={<Icon icon={plusFill} />}
              >
                New Post
              </Button>
            </Hidden>
          }
        />

        <Hidden smUp>
          <Box
            sx={{
              right: 24,
              bottom: 24,
              zIndex: 999,
              position: 'fixed'
            }}
          >
            <MFab component={RouterLink} to={PATH_APP.management.blog.newPost}>
              <Icon icon={roundPostAdd} width={24} height={24} />
            </MFab>
          </Box>
        </Hidden>

        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <SearchPost />
          <SortPosts
            query={filters}
            options={SORT_OPTIONS}
            onSort={handleChangeSort}
          />
        </Box>

        <InfinitScroll
          next={onScroll}
          hasMore={hasMore}
          loader={SkeletonLoad}
          dataLength={posts.length}
          style={{ overflow: 'inherit' }}
        >
          <PostList posts={sortedPosts} />
        </InfinitScroll>
      </Container>
    </Page>
  );
}

export default BlogView;
