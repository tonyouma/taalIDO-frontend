import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { fixedData } from '../../../contracts';
import { tokenData } from '../../../contracts';
import { useWeb3React } from '@web3-react/core';
import Application from 'taalswap-js/src/models';
import getMax from '../../../utils/getMax';
import moment from 'moment';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
    marginTop: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

General.propTypes = {
  className: PropTypes.string
};

function General({ className, pool }) {
  const classes = useStyles();
  const context = useWeb3React();

  const [minSwapLevel, setMinSwapLevel] = useState(0);
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [totalRaise, setTotalRaise] = useState(0);

  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error
  } = context;

  useEffect(async () => {
    if (!!library) {
      const fixedContract = new Contract(
        pool.contractAddress,
        ContractFactory.getInterface(fixedData.abi),
        library.getSigner(account).connectUnchecked()
      );
      const tokenContract = new Contract(
        pool.tokenContractAddr,
        ContractFactory.getInterface(tokenData.abi),
        library.getSigner(account).connectUnchecked()
      );
      const taalswapApp = new Application({
        test: true,
        mainnet: false,
        account: account
      });
      // const swapContract = taalswapApp.getFixedSwapContract({tokenAddress : ERC20TokenAddress, decimals : 18});
      const swapContract = taalswapApp.getFixedSwapContract({
        tokenAddress: pool.tokenContractAddr,
        decimals: 18,
        contractAddress: pool.contractAddress,
        fixedContract: fixedContract,
        tokenContract: tokenContract
      });

      console.log(swapContract);

      await swapContract
        .minimumRaise()
        .then((result) => setMinSwapLevel(result))
        .catch((error) => console.log(error));
      // console.log(temp);

      await swapContract
        .tokensAllocated()
        .then((result) => {
          setTotalRaise(result * pool.tradeValue);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setMax(getMax(pool.maxIndividuals, pool.tradeValue));
    setMin(pool.minIndividuals * pool.tradeValue);

    const temp = '1000000';
    console.log(temp.toLocaleString());
  }, [pool]);

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12}>
                  {/* 타이틀 삽입 */}
                  <Box sx={{ fontSize: 20 }}> Pool Information</Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Token Distribution
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {moment
                        .unix(pool.startDate)
                        .format('YYYY-MM-DD HH:mm:ss')}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Max. Allocation
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {max} ETH
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Min. Allocation
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {min === 0 ? 'No minimum' : { min }} ETH
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Min. Swap Level
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {parseFloat(minSwapLevel).toLocaleString()}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Access Type
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {pool.access}
                    </Typography>
                  </div>
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
                  <Box sx={{ fontSize: 20 }}> Token Information</Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Name
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {pool.poolName}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Address
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {pool.tokenContractAddr}
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Total Raise
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      {totalRaise} ETH
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Holders
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      6,223 (연동예정)
                    </Typography>
                  </div>

                  <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />

                  <div className={classes.row}>
                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ color: 'text.secondary' }}
                    >
                      Transfers
                    </Typography>
                    <Typography
                      component="p"
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      35,576 (연동예정)
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default General;
