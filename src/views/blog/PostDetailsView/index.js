import Hero from './Hero';
import Tags from './Tags';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import CommentForm from './CommentForm';
import { useSnackbar } from 'notistack';
import CommentList from './CommentList';
import RecentPosts from './RecentPosts';
import React, { useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import { useParams } from 'react-router-dom';
import Markdown from 'src/components/Markdown';
import fakeRequest from 'src/utils/fakeRequest';
import { HeaderDashboard } from 'src/layouts/Common';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, getRecentPosts } from 'src/redux/slices/blog';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Divider,
  Skeleton,
  Container,
  Typography,
  Pagination
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton
      width="100%"
      height={560}
      variant="rectangular"
      sx={{ borderRadius: 2 }}
    />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

function PostDetailsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { title } = useParams();
  const { post, error, recentPosts } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getPost(title));
    dispatch(getRecentPosts(title));
  }, [dispatch, title]);

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      comment: '',
      name: '',
      email: ''
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({ afterSubmit: error.code });
      }
    }
  });

  return (
    <Page title="Post Details-Management | Minimal-UI" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading="Post Details"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'Blog', href: PATH_APP.management.blog.root },
            { name: sentenceCase(title) }
          ]}
        />

        {post && (
          <Card>
            <Hero post={post} />

            <Box
              sx={{
                p: { xs: 3, md: 5 }
              }}
            >
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown source={post.body} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <Tags post={post} />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
                  ({post.comments.length})
                </Typography>
              </Box>

              <CommentList post={post} />

              <Box
                sx={{
                  mb: 5,
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <Pagination count={8} color="primary" />
              </Box>

              <CommentForm formik={formik} />
            </Box>
          </Card>
        )}

        {!post && SkeletonLoad}

        {error && <Typography variant="h6">404 Post not found</Typography>}

        {recentPosts.length > 0 && <RecentPosts posts={recentPosts} />}
      </Container>
    </Page>
  );
}

export default PostDetailsView;
