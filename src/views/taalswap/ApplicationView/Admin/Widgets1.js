import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { ApexChartsOption } from 'src/components/Charts/Apexcharts';
import roundMoney from '@iconify-icons/ic/round-money';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
import { PoolStatus } from 'src/utils/poolStatus';
import Taalswap from 'src/utils/taalswap';
import {
  getApplicationList,
  searchApplicationListByCreator,
  updateApplication
} from 'src/redux/slices/pool';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      padding: theme.spacing(3),
      backgroundColor: theme.palette.primary.darker
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

async function callApprove(tokenAmount, application, swapContract) {
  const result = await swapContract
    .approveFundERC20({ tokenAmount })
    .catch((error) => {
      // console.log(error);
      throw error;
    });
  // console.log('approveFundERC20', result);
  const receipt = await result.wait();
  // console.log('receipt ', receipt);
  return receipt;
}

async function callFund(tokenAmount, application, swapContract) {
  // console.log('fundAmount : ' + tokenAmount);
  const result = await swapContract.fund({ tokenAmount }).catch((error) => {
    // console.log(error);
    throw error;
  });
  // console.log('callFund', result);
  const receipt = await result.wait();
  // console.log('receipt ', receipt);
  return receipt;
}

async function callAddWhiteListAddress(addresses, application, swapContract) {
  // console.log('whiteListAddress : ', addresses);
  // console.log('app : ', application);
  const result = await swapContract
    .addWhitelistedAddress({ addresses })
    .catch((error) => {
      // console.log(error);
      throw error;
    });
  // console.log('callAddWhiteListAddress', result);
  const receipt = await result.wait();
  // console.log('receipt ', receipt);
  return receipt;
}

async function callWithDrawFunds(application, swapContract) {
  const result = await swapContract.withdrawFunds().catch((error) => {
    // console.log('callWithDrawFunds', error);
    throw error;
  });
  // console.log('callWithDrawFunds', result);
  const receipt = await result.wait();
  // console.log('receipt ', receipt);
  return receipt;
}

async function callWithDrawUnsoldTokens(application, swapContract) {
  const result = await swapContract.withdrawUnsoldTokens().catch((error) => {
    // console.log('callWithDrawUnsoldTokens', error);
    throw error;
  });
  // console.log('callWithDrawUnsoldTokens', result);
  const receipt = await result.wait();
  // console.log('receipt ', receipt);
  return receipt;
}
// ----------------------------------------------------------------------

Widgets1.propTypes = {
  className: PropTypes.string
};

function Widgets1({ className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const context = useWeb3React();
  const { account, library } = context;
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const { applicationList } = useSelector((state) => state.pool);

  const [selectedPool, setSelectedPool] = useState('');
  const [inputs, setInputs] = useState({
    approveAmount: '',
    fundAmount: '',
    whiteList: ''
  });

  const { approveAmount, fundAmount, whiteList } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleChange = (e) => {
    // console.log('selected value', e.target.value);
    setSelectedPool(e.target.value);
  };

  const getSelectedApp = () => {
    // console.log('getSelectedApp', selectedPool);
    return applicationList.filter(
      (pool) =>
        pool.id === parseInt(selectedPool) && pool.contractAddress !== ''
    )[0];
  };

  const onClickApprove = async () => {
    if (!Number.isInteger(parseInt(approveAmount))) {
      //approveAmount 는 int 여야함.
      alert('approveAmount는 정수여야합니다.');
      return;
    }

    setOpen(true);
    const selectedItem = getSelectedApp();
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });

    const ret = {};
    const receipt = await callApprove(
      parseInt(approveAmount),
      selectedItem,
      swapContract
    ).catch((error) => {
      ret.error = error;
    });
    // console.log('Approve result', receipt);
    if (ret.error) {
      enqueueSnackbar('Approve fail', { variant: 'error' });
    } else {
      if (receipt.status === 1)
        enqueueSnackbar('Approve success', { variant: 'success' });
      else enqueueSnackbar('Approve fail', { variant: 'error' });
    }
    setOpen(false);
  };

  const onClickFund = async () => {
    if (!Number.isInteger(parseInt(fundAmount))) {
      //fundAmount 는 int 여야함.
      enqueueSnackbar('Fund Amount is integer', { variant: 'error' });
      return;
    }
    setOpen(true);
    const selectedItem = getSelectedApp();
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const ret = {};
    const receipt = await callFund(
      parseInt(fundAmount),
      selectedItem,
      swapContract
    ).catch((error) => {
      ret.error = error;
    });
    // console.log('fund result', receipt);
    if (ret.error) {
      enqueueSnackbar('Fund fail', { variant: 'error' });
    } else {
      if (receipt.status === 1) {
        dispatch(
          updateApplication(
            selectedItem.id,
            { status: PoolStatus.UPCOMING, userId: location.state.userId },
            location.state.accessToken
          )
        );
        enqueueSnackbar('Fund success', { variant: 'success' });
      } else enqueueSnackbar('Fund fail', { variant: 'error' });
    }
    setOpen(false);
  };

  const onClickWhiteList = async () => {
    if (whiteList.length === 0) {
      enqueueSnackbar('write WhiteList', { variant: 'error' });
      return;
    }
    setOpen(true);
    const selectedItem = getSelectedApp();
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const ret = {};
    const receipt = await callAddWhiteListAddress(
      whiteList.split(','),
      selectedItem,
      swapContract
    ).catch((error) => {
      ret.error = error;
    });
    // console.log('whitelist result', receipt);
    if (ret.error) {
      enqueueSnackbar('add whitelist fail', { variant: 'error' });
    } else {
      if (receipt.status === 1)
        enqueueSnackbar('add whitelist success', { variant: 'success' });
      else enqueueSnackbar('add whitelist fail', { variant: 'error' });
    }
    setOpen(false);
  };

  const onClickWithDrawFunds = async () => {
    setOpen(true);
    const selectedItem = getSelectedApp();
    // console.log(
    //   `seleted pool : ${JSON.stringify(selectedItem)}, WithDrawFunds`
    // );
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const ret = {};
    const receipt = await callWithDrawFunds(selectedItem, swapContract).catch(
      (error) => {
        ret.error = error;
      }
    );
    // console.log('WithDrawFunds result', receipt);
    if (ret.error) {
      enqueueSnackbar('WithDrawFunds fail', { variant: 'error' });
    } else {
      if (receipt.status === 1)
        enqueueSnackbar('WithDrawFunds success', { variant: 'success' });
      else enqueueSnackbar('WithDrawFunds fail', { variant: 'error' });
    }
    setOpen(false);
  };

  const onClickWithdrawUnsoldTokens = async () => {
    setOpen(true);
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
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getApplicationList());
    setSelectedPool(location.state ? location.state.selectedItem.id : '');
    // console.log('selected pool', selectedPool);
  }, [account, open]);

  const chartOptions = merge(ApexChartsOption(), {
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

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ ml: 3, color: 'common.white' }} onClick={onClickWithDrawFunds}>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          Claim
        </Typography>
        <Typography variant="h5"> Withdraw Funds </Typography>
      </Box>
      <Icon icon={roundMoney} className={classes.icon} />
    </Card>
  );
}

export default Widgets1;
