import clsx from 'clsx';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { countries } from './countries';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

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

function General({ className }) {
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
    <div className={clsx(classes.root, className)}>
      <Box
        className={classes.box2rem}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          IDO Information
        </Typography>
        <TextField
          label="Project Name"
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
          label="Token Contract Address"
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
          label="Trade Value (In ETH)"
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
          label="Total Raise (Total # of tokens for sale)"
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
          label="Min.Fund Raise (Min. # of tokens to be sold)"
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
          select
          label="Access"
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
          label="Min.Allocation(Min. # of tokens allowed per wallet)"
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
          label="Perferred Start Date"
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
          label="Fee Amount (> 2%)"
          variant="standard"
          InputLabelProps={{
            shrink: 'true'
          }}
          style={{ width: '59%' }}
          value="0.008881"
        />
      </Box>
    </div>
  );
}

export default General;
