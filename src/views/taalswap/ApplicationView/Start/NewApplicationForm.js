import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField,
  InputAdornment,
  FormControlLabel,
  Switch,
  Grid,
  Card,
  CardContent
} from '@material-ui/core';
import { MobileDatePicker } from '@material-ui/lab';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';

// ----------------------------------------------------------------------

const CATEGORIES = [
  { value: 'DeFi', label: 'DeFi' },
  { value: 'NFT', label: 'NFT' },
  { value: 'Others', label: 'Others' }
];

const ACCESS = [
  { value: 'Private', label: 'Private' },
  { value: 'Public', label: 'Public' }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  },
  helperText: {
    padding: theme.spacing(0, 2)
  },
  visible: {
    visibility: 'hidden'
  }
}));

// ----------------------------------------------------------------------

NewApplicationDetailsView.propTypes = {
  formik: PropTypes.object.isRequired,
  className: PropTypes.string
};

function NewApplicationDetailsView({ formik, className, ...other }) {
  const classes = useStyles();
  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps
  } = formik;
  const account = other.account;
  const isEdit = other.edit === 'true' ? true : false;
  const history = useHistory();

  // console.log('account : ' + JSON.stringify(account));
  return (
    <FormikProvider value={formik}>
      <Form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={clsx(classes.root, className)}
        {...other}
      >
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
                      size="small"
                      label="Project Name"
                      disabled={isEdit}
                      {...getFieldProps('poolName')}
                      error={Boolean(touched.poolName && errors.poolName)}
                      helperText={touched.poolName && errors.poolName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Token Contract Address"
                      disabled={isEdit}
                      {...getFieldProps('tokenContractAddr')}
                      error={Boolean(
                        touched.tokenContractAddr && errors.tokenContractAddr
                      )}
                      helperText={
                        touched.tokenContractAddr && errors.tokenContractAddr
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Trade Value"
                      disabled={isEdit}
                      {...getFieldProps('tradeValue')}
                      error={Boolean(touched.tradeValue && errors.tradeValue)}
                      helperText={
                        (touched.tradeValue && errors.tradeValue) || '(In ETH)'
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Total Raise"
                      disabled={isEdit}
                      {...getFieldProps('tradeAmount')}
                      error={Boolean(touched.tradeAmount && errors.tradeAmount)}
                      helperText={
                        (touched.tradeAmount && errors.tradeAmount) ||
                        '(Total # of tokens for sale)'
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Minimum Raise"
                      disabled={isEdit}
                      {...getFieldProps('minFundRaise')}
                      error={Boolean(
                        touched.minFundRaise && errors.minFundRaise
                      )}
                      helperText={
                        (touched.minFundRaise && errors.minFundRaise) ||
                        '(Min. # of tokens to be sold)'
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Access"
                      disabled={isEdit}
                      {...getFieldProps('access')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.access && errors.access)}
                      helperText={touched.access && errors.access}
                    >
                      {ACCESS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Min. Allocation"
                      disabled={isEdit}
                      {...getFieldProps('minIndividuals')}
                      error={Boolean(
                        touched.minIndividuals && errors.minIndividuals
                      )}
                      helperText={
                        (touched.minIndividuals && errors.minIndividuals) ||
                        '(Min. # of tokens allowed per person)'
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Max. Allocation"
                      disabled={isEdit}
                      {...getFieldProps('maxIndividuals')}
                      error={Boolean(
                        touched.maxIndividuals && errors.maxIndividuals
                      )}
                      helperText={
                        (touched.maxIndividuals && errors.maxIndividuals) ||
                        '(Max. # of tokens allowed per person)'
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <MobileDatePicker
                      label="Preferred Start Date"
                      minDate={isEdit ? '' : moment().add(1, 'd').toDate()}
                      disabled={isEdit}
                      value={values.preferredStartDate}
                      size="small"
                      onChange={(date) =>
                        setFieldValue('preferredStartDate', date)
                      }
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Fee Amount"
                      disabled={isEdit}
                      {...getFieldProps('feeAmount')}
                      error={Boolean(touched.feeAmount && errors.feeAmount)}
                      helperText={
                        (touched.feeAmount && errors.feeAmount) || '(> 2%)'
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="start">%</InputAdornment>
                        )
                      }}
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
                      label="Project Name"
                      disabled={isEdit}
                      {...getFieldProps('name')}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      select
                      fullWidth
                      label="Category"
                      disabled={isEdit}
                      {...getFieldProps('category')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
                    >
                      {CATEGORIES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Website URL"
                      disabled={isEdit}
                      {...getFieldProps('websiteUrl')}
                      error={Boolean(touched.websiteUrl && errors.websiteUrl)}
                      helperText={touched.websiteUrl && errors.websiteUrl}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      disabled={isEdit}
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Telegram Handle"
                      disabled={isEdit}
                      {...getFieldProps('telegramHandle')}
                      error={Boolean(
                        touched.telegramHandle && errors.telegramHandle
                      )}
                      helperText={
                        touched.telegramHandle && errors.telegramHandle
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      {...getFieldProps('projectDesc')}
                      disabled={isEdit}
                      error={Boolean(touched.projectDesc && errors.projectDesc)}
                      helperText={touched.projectDesc && errors.projectDesc}
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
                            disabled={isEdit}
                            {...getFieldProps('isAtomic')}
                            color="primary"
                          />
                        }
                        labelPlacement="start"
                        label="Atomic"
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    {isEdit ? (
                      <TextField
                        className={clsx(classes.visible, className)}
                        disabled={isEdit}
                        {...getFieldProps('secret')}
                        error={Boolean(touched.secret && errors.secret)}
                        helperText={touched.secret && errors.secret}
                        fullWidth
                        label="Password"
                        type="password"
                      />
                    ) : (
                      <TextField
                        disabled={isEdit}
                        {...getFieldProps('secret')}
                        error={Boolean(touched.secret && errors.secret)}
                        helperText={touched.secret && errors.secret}
                        fullWidth
                        label="Password"
                        type="password"
                      />
                    )}
                  </Grid>
                </Grid>

                <Box
                  sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}
                >
                  {!isEdit ? (
                    <LoadingButton
                      type="submit"
                      fullWidth
                      disabled={isEdit && account}
                      variant="contained"
                      pending={isSubmitting}
                    >
                      {!account ? 'Connect Wallet' : 'Create'}
                    </LoadingButton>
                  ) : (
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      onClick={history.goBack}
                    >
                      Back
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}

export default NewApplicationDetailsView;
