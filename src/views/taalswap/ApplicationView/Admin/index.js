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
  Typography,
  Grid,
  CardHeader
} from '@material-ui/core';
import {
  searchApplicationListByCreator,
  updateApplication
} from 'src/redux/slices/pool';
import TotalActiveUsers from '../../../general/DashboardAppView/TotalActiveUsers';
import TotalInstalled from '../../../general/DashboardAppView/TotalInstalled';
import TotalDownloads from '../../../general/DashboardAppView/TotalDownloads';
import CurrentDownload from '../../../general/DashboardAppView/CurrentDownload';
import AreaInstalled from '../../../general/DashboardAppView/AreaInstalled';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { fixedData } from 'src/contracts';
import { tokenData } from 'src/contracts';
import { useSnackbar } from 'notistack';
import { PoolStatus } from 'src/utils/poolStatus';
import Taalswap from '../../../../utils/taalswap';
import Numbers from '../../../../utils/Numbers';

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
    marginRight: '1rem'
  }
}));

// function getContract(application, account, library) {
//   console.log('getContract', application, account);
//   const fixedContract = new Contract(
//     application.contractAddress,
//     ContractFactory.getInterface(fixedData.abi),
//     library.getSigner(account).connectUnchecked()
//   );
//
//   const tokenContract = new Contract(
//     application.tokenContractAddr,
//     ContractFactory.getInterface(tokenData.abi),
//     library.getSigner(account).connectUnchecked()
//   );
//
//   const taalswapApp = new Taalswap({
//     test: true,
//     mainnet: false,
//     account: account
//   });
//
//   console.log('endGetContract');
//   // const swapContract = taalswapApp.getFixedSwapContract({tokenAddress : ERC20TokenAddress, decimals : 18});
//   return taalswapApp.getFixedSwapContract({
//     tokenAddress: application.tokenContractAddr,
//     decimals: application.decimals,
//     contractAddress: application.contractAddress,
//     fixedContract: fixedContract,
//     tokenContract: tokenContract
//   });
// }

async function callApprove(tokenAmount, application, swapContract) {
  const ret = {};

  const result = await swapContract
    .approveFundERC20({ tokenAmount })
    .catch((error) => {
      console.log(JSON.stringify(error));
      ret.error = error;
    });

  // console.log(JSON.stringify(result));
  // return (ret.result = result);
  // application에 isApproved : true 추가하여 업데이트
  // isFunded가 true 이면 application.status: upcomming 으로 업데이트
}

async function callFund(tokenAmount, application, swapContract) {
  console.log('fundAmount : ' + tokenAmount);

  const ret = {};

  const result = await swapContract.fund({ tokenAmount }).catch((error) => {
    console.log(JSON.stringify(error));
    ret.error = error;
  });
  ret.result = result;
  console.log('ret result ', JSON.stringify(ret));
  return ret;
}

async function callAddWhiteListAddress(addresses, application, swapContract) {
  console.log('whiteListAddress : ' + JSON.stringify(addresses));

  const ret = {};
  const result = await swapContract.addWhitelistedAddress({ addresses });

  console.log(JSON.stringify(result));
  return (ret.result = result);
}

async function callWithDrawFunds(application, swapContract) {
  const ret = {};
  const result = await swapContract.withdrawFunds().catch((error) => {
    console.log(JSON.stringify(error));
    ret.error = error;
  });

  console.log(JSON.stringify(result));
  return (ret.result = result);
}

async function callWithDrawUnsoldTokens(application, swapContract) {
  const ret = {};
  const result = await swapContract.withdrawUnsoldTokens().catch((error) => {
    console.log(JSON.stringify(error));
    ret.error = error;
  });

  console.log(JSON.stringify(result));
  return (ret.result = result);
}

const AdminView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { account, library } = context;
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { applicationList } = useSelector((state) => state.pool);

  const [selectedPool, setSelectedPool] = useState('');
  const [inputs, setInputs] = useState({
    approveAmount: '',
    fundAmount: '',
    whiteList: ''
  });

  // const taalswap = (pool) => {
  //   console.log(pool);
  //   if (!!library && !!account) {
  //     return new Taalswap({
  //       pool,
  //       account,
  //       library
  //     });
  //   }
  // };

  const { approveAmount, fundAmount, whiteList } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleChange = (e) => {
    console.log('selected value', e.target.value);
    setSelectedPool(e.target.value);
  };

  const getSelectedApp = () => {
    console.log('getSelectedApp', selectedPool);
    return applicationList.filter(
      (pool) =>
        pool.id === parseInt(selectedPool) && pool.contractAddress !== ''
    )[0];
  };

  const onClickApprove = async () => {
    if (!Number.isInteger(parseInt(approveAmount))) {
      //approveAmount 는 int 여야함.
      return;
    }

    console.log('approveAmount : ' + approveAmount);
    const selectedItem = getSelectedApp();
    console.log('selected item contractAddress', selectedItem.contractAddress);
    console.log(
      'selected item tokenContractAddr',
      selectedItem.tokenContractAddr
    );

    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });

    const result = await callApprove(
      parseInt(approveAmount),
      selectedItem,
      swapContract
    );
    // console.log('Approve result', JSON.stringify(result.error));
    // if (result.error) {
    //   enqueueSnackbar('Approvet fail', { variant: 'error' });
    // } else {
    //   enqueueSnackbar('Approve success', { variant: 'success' });
    // }
  };

  const onClickFund = async () => {
    if (!Number.isInteger(parseInt(fundAmount))) {
      //fundAmount 는 int 여야함.
      enqueueSnackbar('Fund Amount is integer', { variant: 'error' });
      return;
    }
    const selectedItem = getSelectedApp();
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const result = await callFund(
      parseInt(fundAmount),
      selectedItem,
      swapContract
    );
    console.log('fund result', JSON.stringify(result.error));
    if (result.error) {
      enqueueSnackbar('Fund fail', { variant: 'error' });
    } else {
      dispatch(
        updateApplication(
          selectedItem.id,
          { status: PoolStatus.UPCOMING, userId: location.state.userId },
          location.state.accessToken
        )
      );
      enqueueSnackbar('Fund success', { variant: 'success' });
    }
  };

  const onClickWhiteList = async () => {
    if (whiteList.length === 0) {
      enqueueSnackbar('write WhiteList', { variant: 'error' });
      return;
    }
    const selectedItem = getSelectedApp();
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const result = await callAddWhiteListAddress(
      whiteList.split(','),
      selectedItem,
      swapContract
    );
    // console.log('whitelist result', JSON.stringify(result.error));
    // if (result.error) {
    //   enqueueSnackbar('add whitelist fail', { variant: 'error' });
    // } else {
    //   enqueueSnackbar('add whitelist success', { variant: 'success' });
    // }
  };

  const onClickWithDrawFunds = async () => {
    const selectedItem = getSelectedApp();
    console.log(
      `seleted pool : ${JSON.stringify(selectedItem)}, WithDrawFunds`
    );
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const result = await callWithDrawFunds(selectedItem, swapContract);
    console.log('WithDrawFunds result', JSON.stringify(result.error));
    if (result.error) {
      enqueueSnackbar('WithDrawFunds fail', { variant: 'error' });
    } else {
      enqueueSnackbar('WithDrawFunds success', { variant: 'success' });
    }
  };

  const onClickWithdrawUnsoldTokens = async () => {
    const selectedItem = getSelectedApp();
    console.log(
      `seleted pool : ${JSON.stringify(selectedItem)}, WithdrawUnsoldTokens`
    );
    const swapContract = new Taalswap({
      application: selectedItem,
      account,
      library
    });
    const result = await callWithDrawUnsoldTokens(selectedItem, swapContract);
    // console.log('WithdrawUnsoldTokens result', JSON.stringify(result.error));
    // if (result.error) {
    //   enqueueSnackbar('WithdrawUnsoldTokens fail', { variant: 'error' });
    // } else {
    //   enqueueSnackbar('WithdrawUnsoldTokens success', { variant: 'success' });
    // }
  };

  useEffect(() => {
    dispatch(searchApplicationListByCreator(account));
    setSelectedPool(location.state ? location.state.selectedItem.id : '');
    console.log('selected pool', selectedPool);
  }, [account]);

  return (
    <Page
      title="New Application-Management | Minimal-UI"
      className={classes.root}
    >
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

            <Grid item xs={12} md={12}>
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

            <Grid item xs={12} md={12}>
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
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={12}>
              <Card>
                <CardHeader title="Claim" />
                <Box className={classes.box}>
                  <Button
                    variant="contained"
                    size="medium"
                    onClick={onClickWithDrawFunds}
                    style={{ minWidth: '200px' }}
                  >
                    WithDrawFunds
                  </Button>
                </Box>
                <Box className={classes.box}>
                  <Button
                    width="50%"
                    variant="contained"
                    size="medium"
                    onClick={onClickWithdrawUnsoldTokens}
                    style={{ minWidth: '200px' }}
                  >
                    WithdrawUnsoldTokens
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Container>
    </Page>
  );
};

export default AdminView;
