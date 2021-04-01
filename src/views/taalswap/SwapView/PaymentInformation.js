import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, TextField } from '@material-ui/core';
import getMax from '../../../utils/getMax';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5),
      paddingLeft: theme.spacing(5)
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

// ----------------------------------------------------------------------

PaymentInformation.propTypes = {
  className: PropTypes.string
};

function PaymentInformation({ className, pool }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        0 {pool.status}
      </Typography>
      <div className={classes.row}>
        <Typography variant="h6" component="p">
          Access : {pool.access}
        </Typography>
      </div>
      <Box className={classes.box2rem}>
        <TextField
          label="Trade Value"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
          value={`${pool.ratio} ${pool.symbol} = 1 ETH`}
        />
      </Box>
      <Box
        className={classes.box2rem}
        display="flex"
        justifyContent="space-between"
      >
        <TextField
          label="Max. Individuals"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          style={{ width: '49%' }}
          // value={`${getMax(pool.maxIndividuals, pool.tradeValue)} ETH`}
          value={`${pool.maxIndividuals} ${pool.symbol}`}
        />
        <TextField
          label="Price"
          variant="standard"
          InputLabelProps={{
            shrink: true
          }}
          style={{ width: '49%' }}
          value={`${getMax(pool.maxIndividuals, pool.tradeValue)} ETH`}
        />
      </Box>
      <Box className={classes.box2rem} display="flex">
        <Box width="80%" marginTop={4} sx={{ alignItems: 'center' }}>
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
              flex: 3 / 6,
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
            ETH
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
              flex: 3 / 6,
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
            ETH
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default PaymentInformation;
