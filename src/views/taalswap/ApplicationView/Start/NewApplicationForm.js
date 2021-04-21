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
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { MobileDatePicker } from '@material-ui/lab';
import moment from 'moment';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import WalletDialog from '../../Components/WalletDialog';
import './App.css';
// ----------------------------------------------------------------------

const CATEGORIES = [
  { value: 'DeFi', label: 'DeFi' },
  { value: 'NFT', label: 'NFT' },
  { value: 'Others', label: 'Others' }
];

const CHAINS = [
  { value: 'ERC20', label: 'ERC20' },
  { value: 'BSC', label: 'BSC' },
  { value: 'Klaytn', label: 'Klaytn' },
  { value: 'HECO', label: 'HECO' }
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
  },
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
  const activate = other.activate;
  const handleCloseModal = other.handleCloseModal;
  const isEdit = other.edit === 'true' ? true : false;
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { i18n, t } = useTranslation();

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
        {/* 추가 시작 */}
        <Divider />
        <div className={clsx(classes.root, className)} id="info_contentwrap">
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
              disabled={isEdit}
              {...getFieldProps('poolName')}
              error={Boolean(touched.poolName && errors.poolName)}
              helperText={touched.poolName && errors.poolName}
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
              label="Select Chain"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
              disabled={isEdit}
              {...getFieldProps('selectChain')}
              SelectProps={{ native: true }}
              error={Boolean(touched.selectChain && errors.selectChain)}
              helperText={touched.selectChain && errors.selectChain}
            >
              {CHAINS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
            // style={{ border: '1px solid red' }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            <TextField
              label="Token Contract Address"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
              disabled={isEdit}
              {...getFieldProps('tokenContractAddr')}
              error={Boolean(
                touched.tokenContractAddr && errors.tokenContractAddr
              )}
              helperText={touched.tokenContractAddr && errors.tokenContractAddr}
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
              disabled={isEdit}
              {...getFieldProps('tradeValue')}
              error={Boolean(touched.tradeValue && errors.tradeValue)}
              // helperText={
              //   (touched.tradeValue && errors.tradeValue) || '(In ETH)'
              // }
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
              disabled={isEdit}
              {...getFieldProps('tradeAmount')}
              error={Boolean(touched.tradeAmount && errors.tradeAmount)}
              // helperText={
              //   (touched.tradeAmount && errors.tradeAmount) ||
              //   '(Total # of tokens for sale)'
              // }
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
              disabled={isEdit}
              {...getFieldProps('minFundRaise')}
              error={Boolean(touched.minFundRaise && errors.minFundRaise)}
              // helperText={
              //   (touched.minFundRaise && errors.minFundRaise) ||
              //   '(Min. # of tokens to be sold)'
              // }
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
              className={classes.margin}
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
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
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            <TextField
              label="Min.Allocation (Min. # of tokens allowed per wallet)"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
              disabled={isEdit}
              {...getFieldProps('minIndividuals')}
              error={Boolean(touched.minIndividuals && errors.minIndividuals)}
              // helperText={
              //   (touched.minIndividuals && errors.minIndividuals) ||
              //   '(Min. # of tokens allowed per wallet)'
              // }
            />
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            <TextField
              label="Max. Allocation(Max. # of tokens allowed per wallet)"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
              disabled={isEdit}
              {...getFieldProps('maxIndividuals')}
              error={Boolean(touched.maxIndividuals && errors.maxIndividuals)}
              // helperText={
              //   (touched.maxIndividuals && errors.maxIndividuals) ||
              //   '(Max. # of tokens allowed per wallet)'
              // }
            />
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            {/*<TextField
              label="Perferred Start Date"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
              value="0.008881"
            /> */}
            <Box style={{ width: '59%' }}>
              <TextField
                id="Start Date"
                label="Start Date"
                type="datetime-local"
                variant="standard"
                defaultValue={values.startDate}
                disabled={isEdit}
                fullWidth
                {...getFieldProps('startDate')}
                error={Boolean(touched.startDate && errors.startDate)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            <Box style={{ width: '59%' }}>
              <TextField
                id="End Date"
                label="End Date"
                type="datetime-local"
                variant="standard"
                disabled={isEdit}
                fullWidth
                defaultValue={values.endDate}
                {...getFieldProps('endDate')}
                error={Boolean(touched.endDate && errors.endDate)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Box>
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
              disabled={isEdit}
              {...getFieldProps('feeAmount')}
              error={Boolean(touched.feeAmount && errors.feeAmount)}
              // helperText={(touched.feeAmount && errors.feeAmount) || '(> 2%)'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                )
              }}
            />
          </Box>
        </div>

        <Divider />

        <div className={clsx(classes.root, className)} id="info_contentwrap">
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
              disabled={isEdit}
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
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
              disabled={isEdit}
              {...getFieldProps('websiteUrl')}
              error={Boolean(touched.websiteUrl && errors.websiteUrl)}
              helperText={touched.websiteUrl && errors.websiteUrl}
            />
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            <TextField
              label="ICON URL"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
              disabled={isEdit}
              {...getFieldProps('iconUrl')}
              error={Boolean(touched.iconUrl && errors.iconUrl)}
              helperText={touched.iconUrl && errors.iconUrl}
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
              disabled={isEdit}
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            <TextField
              label="Telegram Handle"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              style={{ width: '59%' }}
              disabled={isEdit}
              {...getFieldProps('telegramHandle')}
              error={Boolean(touched.telegramHandle && errors.telegramHandle)}
              helperText={touched.telegramHandle && errors.telegramHandle}
            />
          </Box>
          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>
            <TextField
              {...getFieldProps('projectDesc')}
              disabled={isEdit}
              error={Boolean(touched.projectDesc && errors.projectDesc)}
              helperText={touched.projectDesc && errors.projectDesc}
              label="Description"
              variant="standard"
              InputLabelProps={{
                shrink: 'true'
              }}
              multiline
              minRows={6}
              maxRows={6}
              style={{ width: '59%' }}
            />
          </Box>

          <Box
            className={classes.box2rem}
            display="flex"
            justifyContent="space-between"
          >
            <Typography variant="h4" sx={{ mb: 2 }}></Typography>

            {isEdit ? (
              <TextField
                className={clsx(classes.visible, className)}
                disabled={isEdit}
                {...getFieldProps('secret')}
                error={Boolean(touched.secret && errors.secret)}
                helperText={touched.secret && errors.secret}
                label="Password"
                variant="standard"
                InputLabelProps={{
                  shrink: 'true'
                }}
                style={{ width: '59%' }}
                type="password"
              />
            ) : (
              <TextField
                disabled={isEdit}
                {...getFieldProps('secret')}
                error={Boolean(touched.secret && errors.secret)}
                helperText={touched.secret && errors.secret}
                label="Password"
                variant="standard"
                InputLabelProps={{
                  shrink: 'true'
                }}
                style={{ width: '59%' }}
                type="password"
              />
            )}
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
              <Box sx={{ ml: 5 }}></Box>
              {!isEdit && account ? (
                <LoadingButton
                  type="submit"
                  // fullWidth
                  disabled={isEdit && account}
                  variant="contained"
                  pending={isSubmitting}
                >
                  {t('taalswap.Submit')}
                </LoadingButton>
              ) : (
                ''
              )}
              {isEdit ? (
                <Button
                  type="button"
                  // fullWidth
                  variant="contained"
                  onClick={history.goBack}
                >
                  Back
                </Button>
              ) : (
                ''
              )}
              {!isEdit && !account ? (
                <Button
                  type="button"
                  // fullWidth
                  variant="contained"
                  target="_blank"
                  onClick={() => setIsOpenModal(true)}
                >
                  {t('taalswap.ConnectWallet')}
                </Button>
              ) : (
                ''
              )}
            </Box>
          </Box>
        </div>

        {/* 추가 끝 */}
        {/*
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={12}>
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
                        '(Min. # of tokens allowed per wallet)'
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
                        '(Max. # of tokens allowed per wallet)'
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
        </Grid> */}
      </Form>
      <WalletDialog
        isOpenModal={isOpenModal}
        handleCloseModal={() => setIsOpenModal(false)}
        activate={activate}
      />
    </FormikProvider>
  );
}

export default NewApplicationDetailsView;
