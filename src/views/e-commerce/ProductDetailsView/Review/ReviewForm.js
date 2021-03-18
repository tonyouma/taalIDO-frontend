import clsx from 'clsx';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import fakeRequest from 'src/utils/fakeRequest';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  margin: {
    marginTop: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

ReviewForm.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string
};

function ReviewForm({ onClose, className, ...other }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const ReviewSchema = Yup.object().shape({
    rating: Yup.mixed().required('Rating is required'),
    review: Yup.string().required('Review is required'),
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      rating: null,
      review: '',
      name: '',
      email: ''
    },
    validationSchema: ReviewSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      await fakeRequest(500);
      alert(JSON.stringify(values, null, 2));
      onClose();
      resetForm();
      setSubmitting(false);
      enqueueSnackbar('Verify success', { variant: 'success' });
    }
  });

  const {
    errors,
    touched,
    resetForm,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps
  } = formik;

  const onCancel = () => {
    onClose();
    resetForm();
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <Typography variant="subtitle1">Add Review</Typography>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className={classes.margin}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Box sx={{ mr: 1.5 }}>Your review about this product:</Box>
              <Rating
                {...getFieldProps('rating')}
                onChange={(event) =>
                  setFieldValue('rating', Number(event.target.value))
                }
              />
            </Box>
            {errors.rating && (
              <FormHelperText error>
                {touched.rating && errors.rating}
              </FormHelperText>
            )}
          </div>
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            label="Review *"
            {...getFieldProps('review')}
            error={Boolean(touched.review && errors.review)}
            helperText={touched.review && errors.review}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="Name *"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="Email *"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            className={classes.margin}
          />

          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button
              type="button"
              color="inherit"
              variant="outlined"
              onClick={onCancel}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
            >
              Post review
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default ReviewForm;
