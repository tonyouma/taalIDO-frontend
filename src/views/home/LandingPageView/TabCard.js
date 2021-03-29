import * as React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PlanCard from './PlanCard';
import Page from 'src/components/Page';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Grid,
  Switch,
  Container,
  Typography
} from '@material-ui/core';
import { PATH_APP } from 'src/routes/paths';

// ----------------------------------------------------------------------

const PLANS = [
  {
    lists: [
      { text: 'Ratio', describe: ['0.1 Token per USDT'], isAvailable: true },
      { text: 'MAX', describe: ['10,000 Token'], isAvailable: true },
      { text: 'Access', describe: ['Whitelisted'], isAvailable: true },
      { text: 'MAX. Contribution', describe: ['Address'], isAvailable: true },
      {
        text: 'Total Raise',
        describe: ['1,000 USDT'],
        isAvailable: true
      }
    ]
  },
  {
    lists: [
      { text: 'Ratio', describe: ['0.1 Token per USDT'], isAvailable: true },
      { text: 'MAX', describe: ['10,000 Token'], isAvailable: true },
      { text: 'Access', describe: ['Whitelisted'], isAvailable: true },
      { text: 'MAX. Contribution', describe: ['Address'], isAvailable: true },
      {
        text: 'Total Raise',
        describe: ['1,000 USDT'],
        isAvailable: true
      }
    ]
  },
  {
    lists: [
      { text: 'Ratio', describe: ['0.1 Token per USDT'], isAvailable: true },
      { text: 'MAX', describe: ['10,000 Token'], isAvailable: true },
      { text: 'Access', describe: ['Whitelisted'], isAvailable: true },
      { text: 'MAX. Contribution', describe: ['Address'], isAvailable: true },
      {
        text: 'Total Raise',
        describe: ['1,000 USDT'],
        isAvailable: true
      }
    ]
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
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
  },
  // page 2-1 글자 스타일
  label: {
    fontSize: 20
  }
}));

// ----------------------------------------------------------------------

function Tabcard() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="TaalSwap Finace" className={classes.root}>
      <Container maxWidth="lg">
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="Live&Upcoming Pools" className={classes.label} />
            <Tab label="Accomplished Pools" className={classes.label} />
          </Tabs>
        </Box>

        <Box sx={{ my: 5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          ></Box>
        </Box>

        <Grid container spacing={3}>
          {PLANS.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PlanCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ my: 5 }}>
          {PLANS.map((card, index) => (
            <Grid item xs={12} md={4} key={card.subscription}>
              <PlanCard card={card} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ my: 7 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Button
              // to={PATH_APP.root}
              fullWidth
              size="large"
              variant="outlined"
              component={RouterLink}
            >
              View All
            </Button>
          </Box>
        </Box>
      </Container>
    </Page>
  );
}

export default Tabcard;
