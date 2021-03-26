import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../../components/Page';
import {
  Box,
  Card,
  CardHeader,
  Container,
  Grid,
  Button,
  Typography,
  TextField,
  LinearProgress
} from '@material-ui/core';
import { useContract } from '../../../hooks/useContract';
import talkData from '../../../contracts/Talken';
import fixedData from '../../../contracts/FixedSwap';
import { useDispatch, useSelector } from 'react-redux';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  boxButtons: {
    marginTop: '1rem',
    marginLeft: '1rem'
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

function SwapView() {
  const classes = useStyles();
  const location = useLocation();

  const [symbol, setSymbol] = useState('');
  const [ratio, setRatio] = useState(0);
  const [max, setMax] = useState(0);
  const [allocated, setAllocated] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isPreStart, setIsPreStart] = useState(false);
  const [isSaleFunded, setIsSaleFunded] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);

  const selectedPool = location.state.selectedPool;

  const talkContract = useContract(selectedPool.address, talkData.abi);
  const fixedContract = useContract(selectedPool.contract, fixedData.abi);

  const onChangeBidAmount = (e) => {
    e.preventDefault();
    setBidAmount(e.target.value);
  };

  const onClickGo = () => {
    console.log(bidAmount);
  };

  const fetchData = useCallback(async () => {
    !!talkContract &&
      (await talkContract.functions
        .symbol()
        .then((result) => setSymbol(result.tokenSymbol))
        // .then((result) => console.log(result))
        .catch((error) => console.log(error)));

    !!fixedContract &&
      (await fixedContract.functions
        .tokensAllocated()
        .then((result) => setAllocated(result))
        .catch((error) => console.log(error)));

    !!fixedContract &&
      (await fixedContract.functions
        .getBuyers()
        .then((result) => {
          const buyers = result[0].filter((buyer) => buyer !== null);
          setParticipants(buyers.length);
        })
        .catch((error) => console.log(error)));

    !!fixedContract &&
      (await fixedContract.functions
        .isOpen()
        .then((result) => setIsOpen(result[0]))
        .catch((error) => console.log(error)));

    !!fixedContract &&
      (await fixedContract.functions
        .isPreStart()
        .then((result) => setIsPreStart(result[0]))
        .catch((error) => console.log(error)));

    !!fixedContract &&
      (await fixedContract.functions
        .isSaleFunded()
        .then((result) => setIsSaleFunded(result[0]))
        .catch((error) => console.log(error)));
  }, [talkContract]);

  useEffect(() => {
    console.log(selectedPool);
    fetchData();

    setRatio(1 / (selectedPool.value * Math.pow(10, -18)));
    setMax(selectedPool.max * selectedPool.value * Math.pow(10, -18));
    setProgressValue(allocated / selectedPool.sale);
  }, [fetchData]);

  return (
    <Page title="Swap | IDO" className={classes.root}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={selectedPool.name} />
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box
                    className={classes.boxButtons}
                    sx={{
                      '& > :not(style)': {
                        m: 1
                      }
                    }}
                  >
                    <Button variant="contained">participate</Button>
                    <Button variant="contained">project info</Button>
                    <Button variant="contained">project news</Button>
                  </Box>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box className={classes.box2rem}>
                    <Box className={classes.box2rem}>
                      <Typography variant="body1">0 live</Typography>
                      <Typography variant="body1">
                        Participant : Public
                      </Typography>
                    </Box>
                    <Box className={classes.box2rem}>
                      <TextField
                        label="Fixed Swap Ratio"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true
                        }}
                        fullWidth
                        value={`${ratio} ETH = 1 ${symbol}`}
                      />
                    </Box>
                    <Box
                      className={classes.box2rem}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <TextField
                        label="Price, $"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true
                        }}
                        value="0.008881"
                        style={{ width: '49%' }}
                      />
                      <TextField
                        label="Maximum Allocation per Wallet"
                        variant="standard"
                        InputLabelProps={{
                          shrink: true
                        }}
                        style={{ width: '49%' }}
                        value={`${max} ETH`}
                      />
                    </Box>
                    <Box className={classes.box2rem} textAlign="center">
                      Auction progress : 0 BNB / 10 BNB
                      <LinearProgress
                        variant="determinate"
                        value={0}
                        style={{ marginTop: '0.5rem' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Box style={{ margin: '2rem' }}>
                    <Box className={classes.box} textAlign="center">
                      <Typography variant="h3">Join The Pool</Typography>
                    </Box>
                    <Box
                      className={classes.box}
                      textAlign="center"
                      color="gray"
                    >
                      <Typography variant="body2">
                        0d : 5h : 22m : 51s
                      </Typography>
                    </Box>
                    <Box
                      className={classes.box}
                      textAlign="center"
                      color="gray"
                    >
                      <div
                        style={{
                          height: '3px',
                          maxWidth: '100%',
                          backgroundColor: 'black'
                        }}
                      />
                    </Box>
                    <Box
                      className={classes.box}
                      textAlign="center"
                      color="gray"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography variant="body2">Your Bid Ammount</Typography>
                      <Typography variant="body2">Blance : 0 BNB</Typography>
                    </Box>
                    <Box
                      className={classes.box}
                      textAlign="center"
                      color="gray"
                      display="flex"
                      justifyContent="space-between"
                    >
                      <TextField
                        label="Bid Ammount"
                        value={bidAmount}
                        variant="standard"
                        fullWidth
                        onChange={onChangeBidAmount}
                      />
                    </Box>
                    <Box className={classes.box} textAlign="center">
                      <Button
                        style={{
                          width: '100%',
                          height: '3.5rem',
                          marginTop: '2rem'
                        }}
                        variant="contained"
                        onClick={onClickGo}
                      >
                        Go
                      </Button>

                      <Typography variant="caption">
                        Have problems with Joing? Click here to read
                        instructions
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default SwapView;
