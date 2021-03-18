import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import PreviewPost from './PreviewPost';
import React, { useState } from 'react';
import NewPostForm from './NewPostForm';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import { fData } from 'src/utils/formatNumber';
import fakeRequest from 'src/utils/fakeRequest';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const FILE_SIZE = 3145728; // bytes
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function NewPostView() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().min(1000).required('Content is required'),
    cover: Yup.mixed()
      .required('Cover is required')
      .test(
        'fileSize',
        `File is larger than ${fData(FILE_SIZE)}`,
        (value) => value && value.size <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'File type must be *.jpeg, *.jpg, *.png, *.gif',
        (value) => value && FILE_FORMATS.includes(value.type)
      )
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      content: '',
      cover: null
    },
    validationSchema: NewBlogSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        handleClosePreview();
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
    <Page title="New Post-Management | Minimal-UI" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading="Create a new post"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'Blog', href: PATH_APP.management.blog.root },
            { name: 'New Post' }
          ]}
        />

        <Card>
          <CardContent>
            <NewPostForm formik={formik} onOpenPreview={handleOpenPreview} />
          </CardContent>
        </Card>

        <PreviewPost
          formik={formik}
          openPreview={open}
          onClosePreview={handleClosePreview}
        />
      </Container>
    </Page>
  );
}

export default NewPostView;
