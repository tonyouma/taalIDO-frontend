import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadiusMd,
    backgroundColor: theme.palette.background.neutral
  },
  form: {
    '& > *': { marginTop: theme.spacing(3) }
  }
}));

// ----------------------------------------------------------------------

CommentForm.propTypes = {
  formik: PropTypes.object.isRequired,
  className: PropTypes.string
};

function CommentForm({ formik, className }) {
  const classes = useStyles();
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="subtitle1">Add Comment</Typography>

      <FormikProvider value={formik}>
        <Form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            label="Comment *"
            {...getFieldProps('comment')}
            error={Boolean(touched.comment && errors.comment)}
            helperText={touched.comment && errors.comment}
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
              className={classes.margin}
            >
              Post comment
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default CommentForm;
