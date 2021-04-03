import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
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

  console.log('account : ' + JSON.stringify(account));
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
                    disabled={!account ? true : false}
                  >
                    {!account ? 'Connect Wallet' : 'Create'}
                  </LoadingButton>
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
