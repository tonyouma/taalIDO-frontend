import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    //console.log(location.state.selectedPool);
  }, [location]);

  return (
    <Page title="Swap | IDO" className={classes.root}>
      <Box display="flex" justifyContent="center" sx={{ fontSize: 30 }}>
        XXX Protocol
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          fontSize: 15,
          color: '#888888',
          fontWeight: 'bold'
        }}
      >
        swap
      </Box>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12}>
            <Card>
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
                        Praticipant : Public
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
                        value="1 BNB = 30000 ALICE"
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
                        value="5 BNB"
                      />
                    </Box>
                    <Box className={classes.box2rem} display="flex">
                      <Box width="80%" marginTop={2}>
                        <Typography color="#888888" sx={{ mx: 1 }}>
                          Auction progress :
                        </Typography>
                      </Box>
                      <Typography variant="h2" sx={{ mx: 1 }}>
                        0
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          mb: 1,
                          alignSelf: 'flex-end',
                          color: 'text.secondary'
                        }}
                      >
                        bnb
                      </Typography>
                      <Typography
                        component="span"
                        variant="h5"
                        paddingLeft={1}
                        sx={{
                          mb: 1,
                          alignSelf: 'flex-end',
                          color: 'text.secondary'
                        }}
                      >
                        /
                      </Typography>
                      <Typography variant="h2" sx={{ mx: 1 }}>
                        10
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          mb: 1,
                          alignSelf: 'flex-end',
                          color: 'text.secondary'
                        }}
                      >
                        bnb
                      </Typography>
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
                      display="flex"
                      justifyContent="space-between"
                    >
                      <TextField
                        label="Bid Ammount"
                        variant="standard"
                        fullWidth
                      />
                      <Box
                        sx={{
                          mb: 2.5,
                          display: 'flex',
                          justifyContent: 'flex-end'
                        }}
                      >
                        <Typography sx={{ color: 'text.secondary' }}>
                          $
                        </Typography>
                        <Typography variant="h2" sx={{ mx: 1 }}>
                          9.99
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          sx={{
                            mb: 1,
                            alignSelf: 'flex-end',
                            color: 'text.secondary'
                          }}
                        >
                          /mo
                        </Typography>
                      </Box>
                    </Box>
                    <Box className={classes.box} textAlign="center">
                      <Button
                        style={{
                          width: '100%',
                          height: '3.5rem',
                          marginTop: '2rem'
                        }}
                        variant="contained"
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
