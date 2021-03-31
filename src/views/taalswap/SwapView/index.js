import React from 'react';
import clsx from 'clsx';
import Page from 'src/components/Page';
import { HeaderDashboard } from 'src/layouts/Common';
import JoninthePool from './JoninthePool';
import useBreakpoints from 'src/hooks/useBreakpoints';
import PaymentInformation from './PaymentInformation';
import { useFormik, Form, FormikProvider } from 'formik';
import { MButton } from 'src/theme';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(5)
  }
}));

// ----------------------------------------------------------------------

function PaymentView(className, ...other) {
  const classes = useStyles();
  const upMd = useBreakpoints('up', 'md');
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: ''
    }
  });

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard heading="XXXProtocol" links={[{ name: 'Swap' }]} />

        <div className={clsx(classes.root, className)} {...other}>
          <MButton color="error" size="small" variant="contained">
            Participate
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
