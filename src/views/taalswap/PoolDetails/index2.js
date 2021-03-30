import faker from 'faker';
import React from 'react';
import Block from 'src/components/Block';
import { sum } from 'lodash';
import Page from 'src/components/Page';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  TextField,
  Card,
  Divider,
  Container,
  Typography
} from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const INVOICE = {
  id: faker.random.uuid(),
  taxes: 5,
  discount: 10,
  status: 'paid',
  items: [...Array(3)].map((item) => {
    return {
      id: faker.random.uuid(),
      title: faker.lorem.sentence(),
      description: faker.lorem.lines(),
      qty: faker.random.number({ min: 1, max: 5 }),
      price: faker.random.number({ min: 4, max: 99, precision: 0.01 })
    };
  })
};

const useStyles = makeStyles((theme) => ({
  root: {},
  tableHead: {
    borderBottom: `solid 1px ${theme.palette.divider}`,
    '& th': {
      backgroundColor: 'transparent'
    }
  },
  row: {
    borderBottom: `solid 1px ${theme.palette.divider}`
  },
  rowResult: {
    '& td': {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  }
}));

// ----------------------------------------------------------------------

function PoolVeiw() {
  const classes = useStyles();
  const subTotal = sum(INVOICE.items.map((item) => item.price * item.qty));
  const total = subTotal - INVOICE.discount + INVOICE.taxes;

  return (
    <Page title="TaalSwap | IDO" className={classes.root}>
      <Container>
        <HeaderDashboard heading="Protocol" links={[{ name: 'infotext' }]} />

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid container spacing={5}>
              <Grid item xs={12} md={12}>
                <Block title="General">
                  <Typography variant="body2">
                    We appreciate your business. Should you need us to add VAT
                    or extra notes let us know!
                  </Typography>
                </Block>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}></Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}

export default PoolVeiw;
