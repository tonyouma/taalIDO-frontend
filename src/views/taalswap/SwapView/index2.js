import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Page from '../../../components/Page';
import shareFill from '@iconify-icons/eva/share-fill';
import { MButton } from 'src/theme';
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
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(5),
    '& > *': {
      marginLeft: theme.spacing(1)
    }
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

function SwapView(className, ...other) {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    //console.log(location.state.selectedPool);
  }, [location]);

  return (
    <Page title="TaalSwap | IDO" className={classes.root}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" gutterBottom>
            {' XX Protocol '}
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            Swap
          </Typography>
        </Box>
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
        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} sx={{ mb: 5 }}>
              <Box className={classes.box2rem}>
                <Box className={classes.box2rem}>
                  <Typography variant="body1">0 live</Typography>
                  <Typography variant="body1">Praticipant : Public</Typography>
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
                  <Box width="80%" marginTop={2} sx={{ alignItems: 'center' }}>
                    <Typography color="#888888" sx={{ mx: 1 }}>
                      Auction progress :
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}
                    display="flex"
                  >
                    <TextField
                      sx={{
                        flex: 1 / 6,
                        flexWrap: 'wrap'
                      }}
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                      size="small"
                      value="0"
                      margin="normal"
                      inputProps={{
                        style: { fontSize: 30, textAlign: 'center' }
                      }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 0 } }} // font size of input label
                    />
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
                    <TextField
                      sx={{
                        flex: 1 / 6,
                        flexWrap: 'wrap'
                      }}
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                      size="small"
                      value="10"
                      margin="normal"
                      inputProps={{
                        style: { fontSize: 30, textAlign: 'center' }
                      }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 0 } }} // font size of input label
                    />
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
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    style={{ marginTop: '0.5rem' }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                style={{
                  margin: '2rem',
                  backgroundColor: '#cccccc',
                  borderRadius: 5
                }}
              >
                <Box className={classes.box}>
                  <Typography variant="h3">Join The Pool</Typography>
                </Box>
                <Box className={classes.box} color="gray">
                  <Typography variant="body2">0d : 5h : 22m : 51s</Typography>
                </Box>
                <Box className={classes.box} textAlign="center" color="gray">
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
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body2" sx={{ alignSelf: 'center' }}>
                    Your Bid Ammount
                  </Typography>
                  <Box
                    sx={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}
                    display="flex"
                  >
                    <Typography sx={{ color: 'text.secondary' }}>$</Typography>
                    <TextField
                      sx={{
                        flex: 1 / 4,
                        flexWrap: 'wrap'
                      }}
                      variant="standard"
                      InputLabelProps={{
                        shrink: true
                      }}
                      size="small"
                      value="9.99"
                      margin="normal"
                      inputProps={{ style: { fontSize: 30 } }} // font size of input text
                      InputLabelProps={{ style: { fontSize: 0 } }} // font size of input label
                    />
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
                    Have problems with Joing? Click here to read instructions
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}

export default SwapView;
