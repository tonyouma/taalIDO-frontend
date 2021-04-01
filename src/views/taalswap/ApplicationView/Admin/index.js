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
  Grid
} from '@material-ui/core';
import { searchApplicationListByCreator } from 'src/redux/slices/pool';
import TotalActiveUsers from '../../../general/DashboardAppView/TotalActiveUsers';
import TotalInstalled from '../../../general/DashboardAppView/TotalInstalled';
import TotalDownloads from '../../../general/DashboardAppView/TotalDownloads';
import CurrentDownload from '../../../general/DashboardAppView/CurrentDownload';
import AreaInstalled from '../../../general/DashboardAppView/AreaInstalled';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import Application from 'taalswap-js/src/models';
import { fixedData } from 'src/contracts';
import { tokenData } from 'src/contracts';

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

function getContract(application, account, library) {
  console.log('application : ' + JSON.stringify(application));
  console.log('account : ' + account);
  console.log('library : ' + library);
  const fixedContract = new Contract(
    application.contractAddress,
    ContractFactory.getInterface(fixedData.abi),
    library.getSigner(account).connectUnchecked()
  );

  console.log('fixedContract complete ');
  const tokenContract = new Contract(
    application.tokenContractAddr,
    ContractFactory.getInterface(tokenData.abi),
    library.getSigner(account).connectUnchecked()
  );

  console.log('tokenContract complete ');
  const taalswapApp = new Application({
    test: true,
    mainnet: false,
    account: account
  });

  console.log('taalswapApp complete ');
  // const swapContract = taalswapApp.getFixedSwapContract({tokenAddress : ERC20TokenAddress, decimals : 18});
  return taalswapApp.getFixedSwapContract({
    tokenAddress: application.tokenContractAddr,
    decimals: 18,
    contractAddress: application.contractAddress,
    fixedContract: fixedContract,
    tokenContract: tokenContract
  });

  console.log('getFixedSwapContract complete ');
}

async function callApprove(approveAmount, application, account, library) {
  console.log('approveAmount : ' + approveAmount);

  const ret = {};
  const swapContract = getContract(application, account, library);
  const result = await swapContract
    .approveFundERC20(approveAmount)
    .catch((error) => {
      console.log(JSON.stringify(error));
      ret.error = error;
    });

  if (!!ret.error) {
    return ret;
  }

  console.log(JSON.stringify(result));
  // application에 isApproved : true 추가하여 업데이트
  // isFunded가 true 이면 application.status: upcomming 으로 업데이트
}

async function callFund(fundAmount, application, account, library) {
  console.log('fundAmount : ' + fundAmount);

  const ret = {};
  const swapContract = getContract(application, account, library);
  const result = await swapContract.fund(fundAmount).catch((error) => {
    console.log(JSON.stringify(error));
    ret.error = error;
  });

  if (!!ret.error) {
    return ret;
  }

  console.log(JSON.stringify(result));
  // application에 isFunded : true 추가하여 업데이트
  // isApproved가 true 이면 application.status: upcomming 으로 업데이트
}

async function callAddWhiteListAddress(
  whiteListAddress,
  application,
  account,
  library
) {
  console.log('whiteListAddress : ' + JSON.stringify(whiteListAddress));

  const ret = {};
  const swapContract = getContract(application, account, library);
  const result = await swapContract
    .addWhitelistedAddress(whiteListAddress)
    .catch((error) => {
      console.log(JSON.stringify(error));
      ret.error = error;
    });

  if (!!ret.error) {
    return ret;
  }

  console.log(JSON.stringify(result));
}

async function callWithDrawFunds(application, account, library) {
  const ret = {};
  const swapContract = getContract(application, account, library);
  const result = await swapContract.withdrawFunds().catch((error) => {
    console.log(JSON.stringify(error));
    ret.error = error;
  });

  if (!!ret.error) {
    return ret;
  }

  console.log(JSON.stringify(result));
}

async function callWithDrawUnsoldTokens(application, account, library) {
  const ret = {};
  const swapContract = getContract(application, account, library);
  const result = await swapContract.withdrawUnsoldTokens().catch((error) => {
    console.log(JSON.stringify(error));
    ret.error = error;
  });

  if (!!ret.error) {
    return ret;
  }

  console.log(JSON.stringify(result));
}

const AdminView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const context = useWeb3React();
  const { account, library } = context;
  const location = useLocation();

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
    setSelectedPool(e.target.value);
  };

  const getSelectedApp = () => {
    return applicationList.filter(
      (pool) => pool.id === selectedPool && pool.contractAddress !== ''
    );
  };

  const onClickApprove = async () => {
    if (!Number.isInteger(parseInt(approveAmount))) {
      //approveAmount 는 int 여야함.
      return;
    }

    console.log('approveAmount : ' + approveAmount);
    const selectedItem = getSelectedApp();
    await callApprove(parseInt(approveAmount), selectedItem, account, library);
  };

  const onClickFund = async () => {
    if (!Number.isInteger(parseInt(fundAmount))) {
      //fundAmount 는 int 여야함.
      return;
    }
    const selectedItem = getSelectedApp();
    await callFund(parseInt(fundAmount), selectedItem, account, library);
  };

  const onClickWhiteList = async () => {
    const selectedItem = getSelectedApp();
    await callAddWhiteListAddress(
      whiteList.split(','),
      selectedItem,
      account,
      library
    );
  };

  const onClickWithDrawFunds = async () => {
    const selectedItem = getSelectedApp();
    console.log(
      `seleted pool : ${JSON.stringify(selectedItem)}, WithDrawFunds`
    );
    await callWithDrawFunds(selectedItem, account, library);
  };

  const onClickWithdrawUnsoldTokens = async () => {
    const selectedItem = getSelectedApp();
    console.log(
      `seleted pool : ${JSON.stringify(selectedItem)}, WithdrawUnsoldTokens`
    );
    await callWithDrawUnsoldTokens(selectedItem, account, library);
  };

  useEffect(() => {
    dispatch(searchApplicationListByCreator(account));
    setSelectedPool(location.state.selectedItem.id);
  }, [account, applicationList]);

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

            <Grid item xs={12} md={6} lg={4}>
              <CurrentDownload />
            </Grid>

            <Grid item xs={12} md={6} lg={8}>
              <AreaInstalled />
            </Grid>
          </Grid>
        </Container>
        <CardContent>
          <Typography variant="h6" component="h2">
            Select Application
          </Typography>
          <Box className={classes.box}>
            <TextField
              style={{ minWidth: '200px' }}
              name="selecteApplication"
              select
              defaultValue={location.state.selectedItem.id}
              label="Applications"
              size="small"
              onChange={handleChange}
            >
              {applicationList.map((app, index) => (
                <option key={index} value={app.id}>
                  {app.projectName}
                </option>
              ))}
            </TextField>
          </Box>

          <Typography variant="h6" component="h2">
            Approve
          </Typography>
          <Box className={classes.box}>
            <TextField
              className={classes.textField}
              name="approveAmount"
              label="Amount"
              size="small"
              value={approveAmount}
              onChange={onChange}
            ></TextField>
            <Button variant="contained" size="medium" onClick={onClickApprove}>
              Approve
            </Button>
          </Box>

          <Typography variant="h6" component="h2">
            Fund
          </Typography>
          <Box className={classes.box}>
            <TextField
              className={classes.textField}
              name="fundAmount"
              label="Amount"
              size="small"
              value={fundAmount}
              onChange={onChange}
            ></TextField>
            <Button variant="contained" size="medium" onClick={onClickFund}>
              Fund
            </Button>
          </Box>

          <Typography variant="h6" component="h2">
            WhiteList
          </Typography>
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
            >
              Add
            </Button>
          </Box>
          <Box className={classes.box}>
            <Button
              variant="contained"
              size="medium"
              onClick={onClickWithDrawFunds}
            >
              WithDrawFunds
            </Button>
          </Box>
          <Box className={classes.box}>
            <Button
              variant="contained"
              size="medium"
              onClick={onClickWithdrawUnsoldTokens}
            >
              WithdrawUnsoldTokens
            </Button>
          </Box>
        </CardContent>
      </Container>
    </Page>
  );
};

export default AdminView;
