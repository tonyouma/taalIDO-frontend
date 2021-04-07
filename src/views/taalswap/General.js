import clsx from 'clsx';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { countries } from './countries';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { Form, FormikProvider, useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Switch,
  TextField,
  CardContent,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
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

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  return (
    <div className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      {/* 타이틀 삽입 */}
                      <Box sx={{ fontSize: 18 }}> IDO Information</Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Pool Name"
                        {...getFieldProps('phoneNumber')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Token Contract Address"
                        {...getFieldProps('address')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Trade Value"
                        {...getFieldProps('phoneNumber')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Trade Amount"
                        {...getFieldProps('address')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Min. Fund Raise"
                        {...getFieldProps('phoneNumber')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        select
                        fullWidth
                        label="Address"
                        placeholder="Address"
                        {...getFieldProps('country')}
                        SelectProps={{ native: true }}
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                        className={classes.margin}
                      >
                        <option value="" />
                        {countries.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Max. Individuals"
                        {...getFieldProps('phoneNumber')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Min Individuals"
                        {...getFieldProps('address')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Preferred Start Date"
                        {...getFieldProps('phoneNumber')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Fee Amount"
                        {...getFieldProps('address')}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Grid container spacing={4}>
                    <Grid item xs={12} sm={12}>
                      {/* 타이틀 삽입 */}
                      <Box sx={{ fontSize: 18 }}> Project Information</Box>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Name"
                        {...getFieldProps('displayName')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        select
                        fullWidth
                        label="Category"
                        placeholder="Category"
                        {...getFieldProps('country')}
                        SelectProps={{ native: true }}
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                        className={classes.margin}
                      >
                        <option value="" />
                        {countries.map((option) => (
                          <option key={option.code} value={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Website URL"
                        {...getFieldProps('phoneNumber')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        {...getFieldProps('address')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={12}>
                      <TextField
                        fullWidth
                        label="Telegram Handle"
                        {...getFieldProps('address')}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        {...getFieldProps('about')}
                        fullWidth
                        multiline
                        minRows={6}
                        maxRows={6}
                        label="Description"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          my: 3,
                          display: 'flex',
                          alignItems: 'Right',
                          flexDirection: 'column'
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Switch
                              {...getFieldProps('isPublic')}
                              color="primary"
                            />
                          }
                          labelPlacement="start"
                          label="Atomic"
                        />
                      </Box>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      pending={isSubmitting}
                    >
                      Create
                    </LoadingButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default General;
