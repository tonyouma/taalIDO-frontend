import clsx from 'clsx';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Block from 'src/components/Block';
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
import { countries } from '../../countries';

// ----------------------------------------------------------------------

const CATEGORIES = [
  { value: 'defi', label: 'DeFi' },
  { value: 'nft', label: 'NFT' },
  { value: 'others', label: 'Others' }
];

const ACCESS = [
  { value: 'private', label: 'Private' },
  { value: 'public', label: 'Public' }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  },
  helperText: {
    padding: theme.spacing(0, 2)
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
                      label="Pool Name"
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
                      label="Trade Amount"
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
                      label="Min. Fund Raise"
                      {...getFieldProps('minFundRaise')}
                      error={Boolean(
                        touched.minFundRaise && errors.minFundRaise
                      )}
                      helperText={
                        (touched.minFundRaise && errors.minFundRaise) ||
                        '(Min. # of tokens sold at least)'
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label="Access"
                      {...getFieldProps('access')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.access && errors.access)}
                      helperText={touched.access && errors.access}
                      className={classes.margin}
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
                      label="Min. Individuals"
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
                      label="Max. Individuals"
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
                      minDate={moment().add(1, 'd').toDate()}
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
                      {...getFieldProps('feeAmount')}
                      error={Boolean(touched.feeAmount && errors.feeAmount)}
                      helperText={
                        (touched.feeAmount && errors.feeAmount) || '(> 1%)'
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
                      {...getFieldProps('category')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.category && errors.category)}
                      helperText={touched.category && errors.category}
                      className={classes.margin}
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
                      {...getFieldProps('websiteUrl')}
                      error={Boolean(touched.websiteUrl && errors.websiteUrl)}
                      helperText={touched.websiteUrl && errors.websiteUrl}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Telegram Handle"
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
                            {...getFieldProps('isAtomic')}
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
        {/*<Block title="Project Information" className={classes.margin}>
          <TextField
            fullWidth
            label="Name"
            size="small"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            className={classes.margin}
          />
          <TextField
            select
            fullWidth
            label="Category"
            size="small"
            {...getFieldProps('category')}
            SelectProps={{ native: true }}
            error={Boolean(touched.category && errors.category)}
            helperText={touched.category && errors.category}
            className={classes.margin}
          >
            {CATEGORIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Description"
            size="small"
            {...getFieldProps('projectDesc')}
            error={Boolean(touched.projectDesc && errors.projectDesc)}
            helperText={touched.projectDesc && errors.projectDesc}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="Website URL"
            size="small"
            {...getFieldProps('websiteUrl')}
            error={Boolean(touched.websiteUrl && errors.websiteUrl)}
            helperText={touched.websiteUrl && errors.websiteUrl}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="eMail"
            size="small"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="Telegram handle"
            size="small"
            {...getFieldProps('telegramHandle')}
            error={Boolean(touched.telegramHandle && errors.telegramHandle)}
            helperText={touched.telegramHandle && errors.telegramHandle}
            className={classes.margin}
          />
        </Block>

        <Block title="IDO Information" className={classes.margin}>
          <TextField
            fullWidth
            label="Pool Name"
            size="small"
            {...getFieldProps('poolName')}
            error={Boolean(touched.poolName && errors.poolName)}
            helperText={touched.poolName && errors.poolName}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="Token Contract Address"
            size="small"
            {...getFieldProps('tokenContractAddr')}
            error={Boolean(
              touched.tokenContractAddr && errors.tokenContractAddr
            )}
            helperText={touched.tokenContractAddr && errors.tokenContractAddr}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="Trade Value"
            size="small"
            {...getFieldProps('tradeValue')}
            error={Boolean(touched.tradeValue && errors.tradeValue)}
            helperText={(touched.tradeValue && errors.tradeValue) || '(In ETH)'}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="Trade Amount"
            size="small"
            {...getFieldProps('tradeAmount')}
            error={Boolean(touched.tradeAmount && errors.tradeAmount)}
            helperText={
              (touched.tradeAmount && errors.tradeAmount) ||
              '(Total # of tokens for sale)'
            }
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="Min. Fund Raise"
            size="small"
            {...getFieldProps('minFundRaise')}
            error={Boolean(touched.minFundRaise && errors.minFundRaise)}
            helperText={
              (touched.minFundRaise && errors.minFundRaise) ||
              '(Min. # of tokens sold at least)'
            }
            className={classes.margin}
          />

          <TextField
            select
            fullWidth
            label="Access"
            size="small"
            {...getFieldProps('access')}
            SelectProps={{ native: true }}
            error={Boolean(touched.access && errors.access)}
            helperText={touched.access && errors.access}
            className={classes.margin}
          >
            {ACCESS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Min. Individuals"
            size="small"
            {...getFieldProps('minIndividuals')}
            error={Boolean(touched.minIndividuals && errors.minIndividuals)}
            helperText={
              (touched.minIndividuals && errors.minIndividuals) ||
              '(Min. # of tokens allowed per person)'
            }
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="Max. Individuals"
            size="small"
            {...getFieldProps('maxIndividuals')}
            error={Boolean(touched.maxIndividuals && errors.maxIndividuals)}
            helperText={
              (touched.maxIndividuals && errors.maxIndividuals) ||
              '(Max. # of tokens allowed per person)'
            }
            className={classes.margin}
          />

          <MobileDatePicker
            label="Preferred Start Date"
            size="small"
            minDate={moment().add(1, 'd').toDate()}
            value={values.preferredStartDate}
            onChange={(date) => setFieldValue('preferredStartDate', date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />

          <TextField
            fullWidth
            label="Fee Amount"
            size="small"
            {...getFieldProps('feeAmount')}
            error={Boolean(touched.feeAmount && errors.feeAmount)}
            helperText={(touched.feeAmount && errors.feeAmount) || '(> 1%)'}
            className={classes.margin}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>
            }}
          />
          <div
            style={{
              width: '100%',
              textAlign: 'left'
            }}
          >
            <FormControlLabel
              control={
                <Switch {...getFieldProps('isAtomic')} color="primary" />
              }
              labelPlacement="start"
              label="Atomic"
            />
          </div>
        </Block>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Create
          </LoadingButton>
        </Box>*/}
      </Form>
    </FormikProvider>
  );
}

export default NewApplicationDetailsView;
