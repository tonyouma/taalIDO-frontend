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
import {
  Box,
  Typography,
  TextField,
  Switch,
  FormControlLabel
} from '@material-ui/core';
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

ProjectInformation.propTypes = {
  className: PropTypes.string
};

function ProjectInformation({ className }) {
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

  const { isSubmitting, getFieldProps } = formik;

  return (
    <div className={clsx(classes.root, className)}>
      <Box
        className={classes.box2rem}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Project Information
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
          select
          label="Category"
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
          label="Website URL"
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
          label="Email Address"
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
          label="Telegra Handle"
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
          {...getFieldProps('about')}
          label="Description"
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
        <Typography variant="h4" sx={{ mb: 2 }}></Typography>
        <TextField
          label="Password"
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
        <Typography variant="h4" sx={{ mb: 1 }}></Typography>
        <Box
          style={{ width: '59%' }}
          sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}
        >
          <FormControlLabel
            control={<Switch {...getFieldProps('isPublic')} color="primary" />}
            labelPlacement="start"
            label="Atomic"
          />
          <Box sx={{ ml: 5 }}></Box>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            pending={isSubmitting}
          >
            Create
          </LoadingButton>
        </Box>
      </Box>
    </div>
  );
}

export default ProjectInformation;
