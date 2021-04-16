import clsx from 'clsx';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Typography,
  TextField,
  CardHeader
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import './APP.css';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    marginTop: '1rem',
    marginBottom: '1rem',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  },
  box2rem: {
    marginTop: '2rem',
    marginBottom: '2rem',
    paddingLeft: '1rem',
    paddingRight: '1rem'
  }
}));

// ----------------------------------------------------------------------

General.propTypes = {
  className: PropTypes.string
};

function General({ className, ...other }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: user.phoneNumber,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      about: user.about,
      isPublic: user.isPublic
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { isSubmitting, getFieldProps, errors, touched } = formik;

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Select Application" />
      <div className={clsx(classes.root, className)}>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4" sx={{ mb: 2 }}></Typography>
          <TextField
            select
            label="Applications"
            placeholder="Select"
            variant="standard"
            {...getFieldProps('country')}
            error={Boolean(touched.country && errors.country)}
            helperText={touched.country && errors.country}
            className={classes.margin}
            SelectProps={{ native: true }}
            InputLabelProps={{
              shrink: 'true'
            }}
            style={{ width: '59%' }}
            value="0.008881"
          />
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4" sx={{ mb: 2 }}></Typography>
          <TextField
            label="Approve"
            variant="standard"
            InputLabelProps={{
              shrink: 'true'
            }}
            style={{ width: '59%' }}
            value="0.008881"
          />
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4" sx={{ mb: 2 }}></Typography>
          <TextField
            label="Fund"
            variant="standard"
            InputLabelProps={{
              shrink: 'true'
            }}
            style={{ width: '59%' }}
            value="0.008881"
          />
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4" sx={{ mb: 2 }}></Typography>
          <TextField
            label="WhiteList"
            variant="standard"
            InputLabelProps={{
              shrink: 'true'
            }}
            multiline
            minRows={6}
            maxRows={6}
            style={{ width: '59%' }}
            value="0.008881"
          />
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h4" sx={{ mb: 1 }}></Typography>
          <Box
            style={{ width: '59%' }}
            sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              pending={isSubmitting}
            >
              Add
            </LoadingButton>
          </Box>
        </Box>
      </div>
    </Card>
  );
}

export default General;
