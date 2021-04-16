import { merge } from 'lodash';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon, InlineIcon } from '@iconify/react';
import outlineAttachMoney from '@iconify-icons/ic/outline-attach-money';
import emailFill from '@iconify-icons/eva/email-fill';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Box,
  Typography,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import {
  getApplicationList,
  searchApplicationListByCreator,
  updateApplication
} from 'src/redux/slices/pool';
import Taalswap from 'src/utils/taalswap';
import { useWeb3React } from '@web3-react/core';
import { useSnackbar } from 'notistack';
import { useLocation } from 'react-router';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      padding: theme.spacing(3),
      backgroundColor: theme.palette.warning.darker,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    icon: {
      width: 120,
      height: 120,
      opacity: 0.12,
      position: 'absolute',
      right: theme.spacing(-3),
      color: theme.palette.common.white
    }
  };
});

// ----------------------------------------------------------------------

Widgets2.propTypes = {
  className: PropTypes.string
};

function Widgets2({ className, handleOpen, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const context = useWeb3React();
  const location = useLocation();
  // const [open, setOpen] = useState(false);
  const [selectedPool, setSelectedPool] = useState('');
  const { applicationList } = useSelector((state) => state.pool);
  const { account, library } = context;
  const { enqueueSnackbar } = useSnackbar();
  const chartData = [75];
  const chartOptions = merge(ApexChartsOption(), {
    colors: [theme.palette.warning.main],
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize
          }
        }
      }
    }
  });

  const getSelectedApp = () => {
    // console.log('getSelectedApp', selectedPool);
    return applicationList.filter(
      (pool) =>
        pool.id === parseInt(selectedPool) && pool.contractAddress !== ''
    )[0];
  };

  const onClickWithdrawUnsoldTokens = async () => {
    handleOpen(true);
    const selectedItem = getSelectedApp();
    // console.log(
    //   `seleted pool : ${JSON.stringify(selectedItem)}, WithdrawUnsoldTokens`
    // );
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const ret = {};
    const receipt = await callWithDrawUnsoldTokens(
      selectedItem,
      swapContract
    ).catch((error) => {
      ret.error = error;
    });
    // console.log('WithdrawUnsoldTokens result', receipt);
    if (ret.error) {
      enqueueSnackbar('WithdrawUnsoldTokens fail', { variant: 'error' });
    } else {
      if (receipt.status === 1)
        enqueueSnackbar('WithdrawUnsoldTokens success', { variant: 'success' });
      else enqueueSnackbar('WithdrawUnsoldTokens fail', { variant: 'error' });
    }
    handleOpen(false);
  };

  async function callWithDrawUnsoldTokens(application, swapContract) {
    console.log(swapContract);
    const result = await swapContract.withdrawUnsoldTokens().catch((error) => {
      console.log('callWithDrawUnsoldTokens', error);
      throw error;
    });
    console.log('callWithDrawUnsoldTokens', result);
    const receipt = await result.wait();
    console.log('receipt ', receipt);
    return receipt;
  }

  useEffect(() => {
    dispatch(getApplicationList());
    setSelectedPool(location.state ? location.state.selectedItem.id : '');
    // console.log('selected pool', selectedPool);
  }, [account]);

  return (
    <>
      {/* <Backdrop
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
        className={classes.backdrop}
        open={open}
      >
        <Box>
          <CircularProgress color="inherit" />
        </Box>
        <Box>
          <Typography>In progress… Please wait.</Typography>
        </Box>
      </Backdrop> */}
      <Card
        className={clsx(classes.root, className)}
        onClick={onClickWithdrawUnsoldTokens}
      >
        <Box sx={{ ml: 3, color: 'common.white' }}>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            Claim
          </Typography>
          <Typography variant="h5"> Withdraw Unsold Tokens </Typography>
        </Box>
        <Icon icon={outlineAttachMoney} className={classes.icon} />
      </Card>
    </>
  );
}

export default Widgets2;
