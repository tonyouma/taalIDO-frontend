import clsx from 'clsx';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import fakeRequest from 'src/utils/fakeRequest';
import { useFormik, Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3)
  },
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

ChangePassword.propTypes = {
  className: PropTypes.string
};

function ChangePassword({ className }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    )
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await fakeRequest(500);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <TextField
            {...getFieldProps('oldPassword')}
            fullWidth
            type="password"
            label="Old Password"
            error={Boolean(touched.oldPassword && errors.oldPassword)}
            helperText={touched.oldPassword && errors.oldPassword}
            className={classes.margin}
          />

          <TextField
            {...getFieldProps('newPassword')}
            fullWidth
            type="password"
            label="New Password"
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={
              (touched.newPassword && errors.newPassword) ||
              'Password must be minimum 6+'
            }
            className={classes.margin}
          />

          <TextField
            {...getFieldProps('confirmNewPassword')}
            fullWidth
            type="password"
            label="Confirm New Password"
            error={Boolean(
              touched.confirmNewPassword && errors.confirmNewPassword
            )}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            className={classes.margin}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </Card>
  );
}

export default ChangePassword;
