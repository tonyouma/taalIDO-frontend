import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Page from 'src/components/Page';
import { HeaderDashboard } from 'src/layouts/Common';
import JoninthePool from './JoninthePool';
import useBreakpoints from 'src/hooks/useBreakpoints';
import PaymentInformation from './PaymentInformation';
import { useFormik, Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, Container } from '@material-ui/core';
import PoolButton from './PoolButton';
import { useLocation } from 'react-router-dom';
import PoolDetails from '../PoolDetails';

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
  const location = useLocation();
  const upMd = useBreakpoints('up', 'md');
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      address: ''
    }
  });

  const [pool, setPool] = useState(location.state.selectedPool);

  return (
    <Page title="Table-Components | Minimal-UI" className={classes.root}>
      <Container maxWidth="lg">
        <HeaderDashboard
          heading={pool.poolName}
          links={[{ name: pool.tokenContractAddr }]}
          subTitle={pool.tokenContractAddr}
        />
        <div className={clsx(classes.root, className)} {...other}>
          <PoolButton />
        </div>
        <Card>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
              <Grid container spacing={upMd ? 5 : 2}>
                <Grid item xs={12} md={6}>
                  <PaymentInformation formik={formik} pool={pool} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <JoninthePool formik={formik} pool={pool} />
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Card>
        <Card style={{ marginTop: '3rem' }}>
          <PoolDetails pool={pool} />
        </Card>
      </Container>
    </Page>
  );
}

export default PaymentView;
