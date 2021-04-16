import * as Yup from 'yup';
import Page from 'src/components/Page';
import React, { useEffect, useState } from 'react';
import NewApplicationForm from './NewApplicationForm';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useFormik } from 'formik';
import { createApplication } from 'src/redux/slices/pool';
import moment from 'moment';
import { useWeb3React } from '@web3-react/core';
import { useHistory } from 'react-router-dom';
import Taalswap from 'src/utils/taalswap';
import { useLocation } from 'react-router';
import { PoolStatus } from 'src/utils/poolStatus';
import { register, getMaxId } from 'src/utils/auth';

const crypto = require('crypto');

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function ApplicationStart() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();
  const { from } = useSelector((state) => state.talken);

  const context = useWeb3React();
  const { account, library } = context;

  useEffect(() => {
    // console.log('test : ' + account);
    setEdit(location.state ? true : false);
  }, [account]);

  const NewApplicationSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required'),
    category: Yup.string().required('Category is required'),
    websiteUrl: Yup.string().url().required('Website URL is required'),
    imageUrl: Yup.string().url().required('ICON image URL is required'),
    email: Yup.string().email().required('eMail is required'),
    telegramHandle: Yup.string().required('Telegram handle is required'),
    poolName: Yup.string().required('Pool Name is required'),
    tokenContractAddr: Yup.string().required(
      'Token Contract Address is required'
    ),
    tradeValue: Yup.number().positive().required('Trade Value is required'),
    tradeAmount: Yup.number().positive().required('Total Raise is required'),
    minFundRaise: Yup.number().positive().required('Minimum Raise is required'),
    access: Yup.string().required('Access is required'),
    minIndividuals: Yup.number().min(0).required('Min. Allocation is required'),
    maxIndividuals: Yup.number()
      .positive()
      .required('Max. Allocation is required'),
    feeAmount: Yup.number()
      .positive('Fee Amount is positive integer')
      .integer('Fee Amount is positive integer')
      .min(2)
      .max(100)
      .required('Fee Amount is required'),
    secret: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      name: location.state ? location.state.selectedItem.projectName : '',
      category: location.state ? location.state.selectedItem.category : 'DeFi',
      projectDesc: location.state
        ? location.state.selectedItem.projectDesc
        : '',
      websiteUrl: location.state ? location.state.selectedItem.websiteUrl : '',
      imageUrl: location.state ? location.state.selectedItem.imageUrl : '',
      email: location.state ? location.state.selectedItem.email : '',
      telegramHandle: location.state
        ? location.state.selectedItem.telegramHandle
        : '',
      poolName: location.state ? location.state.selectedItem.poolName : '',
      tokenContractAddr: location.state
        ? location.state.selectedItem.tokenContractAddr
        : '',
      tradeValue: location.state ? location.state.selectedItem.tradeValue : '',
      tradeAmount: location.state
        ? location.state.selectedItem.tradeAmount
        : '',
      minFundRaise: location.state
        ? location.state.selectedItem.minFundRaise
        : '',
      access: location.state ? location.state.selectedItem.access : 'Private',
      minIndividuals: location.state
        ? location.state.selectedItem.minIndividuals
        : '',
      maxIndividuals: location.state
        ? location.state.selectedItem.maxIndividuals
        : '',
      isAtomic: location.state ? location.state.selectedItem.atomic : false,
      preferredStartDate: location.state
        ? moment(location.state.selectedItem.preferredStartDate).toDate()
        : moment().add(1, 'd').toDate(),
      feeAmount: location.state ? location.state.selectedItem.feeAmount : 2
    },
    validationSchema: location.state ? undefined : NewApplicationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (from !== null) {
        alert('토큰앱에서는 사용하실 수 없습니다.');
        return;
      }
      try {
        const newApplication = {
          projectName: values.name,
          category: values.category,
          projectDesc: values.projectDesc,
          websiteUrl: values.websiteUrl,
          imageUrl: values.imageUrl,
          email: values.email,
          telegramHandle: values.telegramHandle,
          poolName: values.poolName,
          tokenContractAddr: values.tokenContractAddr,
          contractAddress: '',
          tradeValue: values.tradeValue,
          tradeAmount: values.tradeAmount,
          minFundRaise: values.minFundRaise,
          access: values.access,
          minIndividuals: values.minIndividuals,
          maxIndividuals: values.maxIndividuals,
          atomic: values.isAtomic,
          preferredStartDate: values.preferredStartDate,
          // startDate: moment(values.preferredStartDate.toDateString()).unix(), // preferredStartDate 에포크타임으로 저장
          // endDate: moment(values.preferredStartDate.toDateString())
          //   .add(30, 'd')
          //   .unix(), // startdate + 30일
          startDate: moment().add(10, 'm').unix(), // preferredStartDate 에포크타임으로 저장
          endDate: moment().add(1, 'd').unix(), // startdate + 30일
          ratio: 1 / values.tradeValue,
          progress: '',
          feeAmount: values.feeAmount,
          status: PoolStatus.CANDIDATE,
          creator: account
        };
        // console.log('======>');
        const taalswap = new Taalswap({
          account,
          library,
          tokenAddress: values.tokenContractAddr
        });
        newApplication.symbol = await taalswap
          .symbolAsync()
          .catch((error) => console.log(error));
        newApplication.decimals = await taalswap
          .decimalsAsync()
          .catch((error) => console.log(error));
        const key = await getMaxId();
        const ret = await register({
          creator: account,
          password: values.secret,
          key
        });
        const { accessToken, userId } = ret;
        newApplication.userId = userId;
        // console.log('======>', newApplication);
        dispatch(createApplication(newApplication, accessToken));
        enqueueSnackbar('Create Application success', { variant: 'success' });
        history.push({
          pathname: '/app/taalswap/application/list'
        });
      } catch (error) {
        // console.error(error);
        setSubmitting(false);
        enqueueSnackbar('Create Application fail', { variant: 'fail' });
        setErrors({ afterSubmit: error.code });
      }
    }
  });

  return (
    <Page title="IDO Admin | TaalSwap" className={classes.root}>
      <Container>
        <HeaderDashboard
          heading="Create a new application"
          links={[{ name: 'New Application' }]}
        />
        <NewApplicationForm
          formik={formik}
          account={account}
          edit={edit.toString()}
        />
      </Container>
    </Page>
  );
}

export default ApplicationStart;
