import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useFormik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  Typography,
  TextField,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { divide } from 'lodash-es';
import './APP.css';
import { useWeb3React } from '@web3-react/core';
import { useLocation } from 'react-router';
import { PoolStatus } from 'src/utils/poolStatus';
import Taalswap from 'src/utils/taalswap';
import {
  getApplicationList,
  searchApplicationListByCreator,
  updateApplication
} from 'src/redux/slices/pool';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
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

General.propTypes = {
  className: PropTypes.string
};

function General({
  className,
  applicationList,
  selectedItem,
  setOpen,
  ...other
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const context = useWeb3React();
  const { account, library } = context;
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { user, updateProfile } = useAuth();
  const [selectedPool, setSelectedPool] = useState('');
  // const [open, setOpen] = useState(false);
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

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required')
  });

  const handleChange = (e) => {
    // console.log('selected value', e.target.value);
    setSelectedPool(e.target.value);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      phoneNumber: user.phoneNumber,
      country: user.country,
      address: user.address,
      state: user.state,
      city: user.city,
      zipCode: user.zipCode,
      about: user.about,
      isPublic: user.isPublic
    },

    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await updateProfile({ ...values });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.code });
          setSubmitting(false);
        }
      }
    }
  });

  const { isSubmitting, getFieldProps, errors, touched } = formik;

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
      console.log('11111');
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

  useEffect(() => {
    setSelectedPool(selectedItem !== undefined ? selectedItem.id : '');
  }, [selectedItem]);

  return (
    <Card className={clsx(classes.root, className)} {...other}>
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
      <div className={clsx(classes.root, className)}>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" sx={{ my: -1, mb: 2 }}>
            Select Application
          </Typography>
          <TextField
            select
            label="Applications"
            placeholder="Select"
            variant="standard"
            {...getFieldProps('country')}
            error={Boolean(touched.country && errors.country)}
            helperText={touched.country && errors.country}
            className={classes.margin}
            SelectProps={{ native: true }}
            InputLabelProps={{
              shrink: 'true'
            }}
            style={{ width: '59%' }}
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
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" sx={{ my: -1, mb: 2 }}>
            Approve
          </Typography>
          <TextField
            label="Amount"
            name="approveAmount"
            variant="standard"
            InputLabelProps={{
              shrink: 'true'
            }}
            style={{ width: '59%' }}
            value={approveAmount}
            onChange={onChange}
          />
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" sx={{ my: -1, mb: 2 }}>
            {' '}
          </Typography>
          <Box
            style={{ width: '59%' }}
            sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              pending={isSubmitting}
              onClick={onClickApprove}
            >
              Approve
            </LoadingButton>
          </Box>
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" sx={{ my: -1, mb: 2 }}>
            Fund
          </Typography>
          <TextField
            label="Amount"
            name="fundAmount"
            variant="standard"
            InputLabelProps={{
              shrink: 'true'
            }}
            style={{ width: '59%' }}
            value={fundAmount}
            onChange={onChange}
          />
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" sx={{ my: -1, mb: 2 }}>
            {' '}
          </Typography>
          <Box
            style={{ width: '59%' }}
            sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              pending={isSubmitting}
              onClick={onClickFund}
            >
              Fund
            </LoadingButton>
          </Box>
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" sx={{ my: -1, mb: 2 }}>
            WhiteList
          </Typography>
          <TextField
            name="whiteList"
            label="WhiteList"
            variant="standard"
            InputLabelProps={{
              shrink: 'true'
            }}
            multiline
            minRows={6}
            maxRows={6}
            style={{ width: '59%' }}
            value={whiteList}
            onChange={onChange}
          />
        </Box>
        <Box
          className={classes.box2rem}
          display="flex"
          justifyContent="space-between"
        >
          <Typography variant="h7" sx={{ mb: 1 }}></Typography>
          <Box
            style={{ width: '59%' }}
            sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              pending={isSubmitting}
              onClick={onClickWhiteList}
            >
              Add
            </LoadingButton>
          </Box>
        </Box>
      </div>
    </Card>
  );
}

export default General;
