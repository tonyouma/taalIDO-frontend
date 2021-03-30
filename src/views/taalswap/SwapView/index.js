import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { useSnackbar } from 'notistack';
import { HeaderDashboard } from 'src/layouts/Common';
import JoninthePool from './JoninthePool';
import fakeRequest from 'src/utils/fakeRequest';
import useBreakpoints from 'src/hooks/useBreakpoints';
import { Link as RouterLink } from 'react-router-dom';
import PaymentInformation from './PaymentInformation';
import { useFormik, Form, FormikProvider } from 'formik';
import { MButton } from 'src/theme';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minHeight: '100%',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10)
  },
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
    }
  }
}));

// ----------------------------------------------------------------------

function PaymentView(className, ...other) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const upMd = useBreakpoints('up', 'md');

  const PaymentSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    address: Yup.string().required('Address is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      subscription: 'premium',
      isMonthly: false,
      method: 'paypal',
      newCardName: '',
      newCardNumber: '',
      newCardExpired: '',
      newCardCvv: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { resetForm }) => {
      const submitData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        address: values.address,
        subscription: 'premium'
      };
      await fakeRequest(500);
      if (values.method === 'paypal') {
        alert(
          JSON.stringify(
            {
              ...submitData,
              method: values.method
            },
            null,
            2
          )
        );
      } else if (values.method !== 'paypal' && !values.newCardName) {
        alert(
          JSON.stringify(
            {
              ...submitData,
              method: values.method,
              card: values.card
            },
            null,
            2
          )
        );
      }
      if (values.newCardName) {
        alert(
          JSON.stringify(
            {
              ...submitData,
              method: values.method,
              newCardName: values.newCardName,
              newCardNumber: values.newCardNumber,
              newCardExpired: values.newCardExpired,
              newCardCvv: values.newCardCvv
            },
            null,
            2
          )
        );
      }
      resetForm();
      enqueueSnackbar('Payment success', { variant: 'success' });
    }
  });

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard heading="XXXProtocol" links={[{ name: 'Swap' }]} />

        <div className={clsx(classes.root, className)} {...other}>
          <MButton color="error" size="small" variant="contained">
            Participage
          </MButton>

          <MButton color="info" size="small" variant="contained">
            Project Info
          </MButton>

          <MButton color="info" size="small" variant="contained">
            Project News
          </MButton>
        </div>
        <Card>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <Grid container spacing={upMd ? 5 : 2}>
                <Grid item xs={12} md={6}>
                  <PaymentInformation formik={formik} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <JoninthePool formik={formik} />
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Card>
      </Container>
    </Page>
  );
}

export default PaymentView;
