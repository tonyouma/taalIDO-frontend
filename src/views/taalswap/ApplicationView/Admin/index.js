import Page from 'src/components/Page';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  TextField,
  Grid,
  CardHeader,
  Backdrop,
  CircularProgress,
  Typography
} from '@material-ui/core';
import {
  getApplicationList,
  searchApplicationListByCreator,
  updateApplication
} from 'src/redux/slices/pool';
import TotalActiveUsers from '../../../general/DashboardAppView/TotalActiveUsers';
import TotalInstalled from '../../../general/DashboardAppView/TotalInstalled';
import TotalDownloads from '../../../general/DashboardAppView/TotalDownloads';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router';
import { useSnackbar } from 'notistack';
import { PoolStatus } from 'src/utils/poolStatus';
import Taalswap from 'src/utils/taalswap';

const useStyles = makeStyles((theme) => ({
  root: {},
  box: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    width: '100%',
    margin: '10px'
  },
  textField: {
    marginRight: '1rem',
    width: '50%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

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

const AdminView = () => {
  const classes = useStyles();
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

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Page title="IDO Application | TaalSwap" className={classes.root}>
        <Container>
          <HeaderDashboard heading="Admin" links={[{ name: 'settings' }]} />

          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TotalActiveUsers />
              </Grid>

              <Grid item xs={12} md={4}>
                <TotalInstalled />
              </Grid>

              <Grid item xs={12} md={4}>
                <TotalDownloads />
              </Grid>
            </Grid>
          </Container>

          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card>
                  <CardHeader title="Select Application" />
                  <Box className={classes.box}>
                    <TextField
                      style={{ minWidth: '360px' }}
                      name="selecteApplication"
                      select
                      label="Applications"
                      size="small"
                      disabled
                      defaultValue={selectedPool}
                      value={selectedPool}
                      onChange={handleChange}
                    >
                      {applicationList.map((app, index) => (
                        <option key={index} value={app.id}>
                          {app.projectName}
                        </option>
                      ))}
                    </TextField>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Approve" />
                  <Box className={classes.box}>
                    <TextField
                      className={classes.textField}
                      name="approveAmount"
                      label="Amount"
                      size="small"
                      value={approveAmount}
                      onChange={onChange}
                    ></TextField>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={onClickApprove}
                      style={{ minWidth: '100px' }}
                    >
                      Approve
                    </Button>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Fund" />
                  <Box className={classes.box}>
                    <TextField
                      className={classes.textField}
                      name="fundAmount"
                      label="Amount"
                      size="small"
                      value={fundAmount}
                      onChange={onChange}
                    ></TextField>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={onClickFund}
                      style={{ minWidth: '100px' }}
                    >
                      Fund
                    </Button>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={12}>
                <Card>
                  <CardHeader title="WhiteList" />
                  <Box className={classes.box}>
                    <TextField
                      className={classes.textField}
                      name="whiteList"
                      label="WhiteList"
                      size="small"
                      value={whiteList}
                      onChange={onChange}
                    ></TextField>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={onClickWhiteList}
                      style={{ minWidth: '100px' }}
                    >
                      Add
                    </Button>
                    <Typography m={2}>
                      Ex. address,address,address,...
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Claim Funds" />
                  <Box className={classes.box}>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={onClickWithDrawFunds}
                      style={{ minWidth: '100px' }}
                    >
                      WithDrawFunds
                    </Button>
                    <Typography m={2} varient="">
                      Funding success or no min. raise...
                    </Typography>
                  </Box>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader title="Claim Tokens" />
                  <Box className={classes.box}>
                    <Button
                      variant="contained"
                      size="medium"
                      onClick={onClickWithdrawUnsoldTokens}
                      style={{ minWidth: '100px' }}
                    >
                      WithdrawUnsoldTokens
                    </Button>
                    <Typography m={2} varient="">
                      Tokens left or Funding failed...
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Container>
      </Page>
    </>
  );
};

export default AdminView;
