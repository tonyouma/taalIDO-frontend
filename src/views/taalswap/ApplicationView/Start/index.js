import * as Yup from 'yup';
import Page from 'src/components/Page';
import React, { useEffect, useState } from 'react';
import NewApplicationForm from './NewApplicationForm';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { useFormik } from 'formik';
import { createApplication } from 'src/redux/slices/pool';
import moment from 'moment';
import { useWeb3React } from '@web3-react/core';
import { Contract, ContractFactory } from '@ethersproject/contracts';
import { tokenData } from 'src/contracts';
import { useHistory } from 'react-router-dom';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

async function getSymbol(address, account, library) {
  const tokenContract = new Contract(
    address,
    ContractFactory.getInterface(tokenData.abi),
    library.getSigner(account).connectUnchecked()
  );
  return await tokenContract.symbol();
}

async function getDecimals(address, account, library) {
  const tokenContract = new Contract(
    address,
    ContractFactory.getInterface(tokenData.abi),
    library.getSigner(account).connectUnchecked()
  );
  return await tokenContract.decimals();
}

function ApplicationStart() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const context = useWeb3React();
  const { account, library } = context;

  useEffect(() => {
    console.log('test : ' + account);
  }, [account]);

  const NewApplicationSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required'),
    category: Yup.string().required('Category is required'),
    websiteUrl: Yup.string().required('Website URL is required'),
    email: Yup.string().email().required('eMail is required'),
    telegramHandle: Yup.string().required('Telegram handle is required'),
    poolName: Yup.string().required('Pool Name is required'),
    tokenContractAddr: Yup.string().required(
      'Token Contract Address is required'
    ),
    tradeValue: Yup.number().positive().required('Trade Value is required'),
    tradeAmount: Yup.number().positive().required('Trade Amount is required'),
    minFundRaise: Yup.number()
      .positive()
      .required('Min. Fund Raise is required'),
    access: Yup.string().required('Access is required'),
    minIndividuals: Yup.number()
      .min(0)
      .required('Min. Individuals is required'),
    maxIndividuals: Yup.number()
      .positive()
      .required('Max. Individuals is required'),
    feeAmount: Yup.number()
      .positive('Fee Amount is positive integer')
      .integer('Fee Amount is positive integer')
      .min(2)
      .max(100)
      .required('Fee Amount is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category: 'DeFi',
      projectDesc: '',
      websiteUrl: '',
      email: '',
      telegramHandle: '',
      poolName: '',
      tokenContractAddr: '',
      tradeValue: '',
      tradeAmount: '',
      minFundRaise: '',
      access: 'Private',
      minIndividuals: '',
      maxIndividuals: '',
      isAtomic: false,
      preferredStartDate: moment().add(1, 'd').toDate(),
      feeAmount: 2
    },
    validationSchema: NewApplicationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const newApplication = {
          projectName: values.name,
          category: values.category,
          projectDesc: values.projectDesc,
          websiteUrl: values.websiteUrl,
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
          startDate: moment().add(2, 'hours').unix(), // preferredStartDate 에포크타임으로 저장
          endDate: moment().add(2, 'd').unix(), // startdate + 30일
          ratio: 1 / values.tradeValue,
          progress: '',
          feeAmount: values.feeAmount,
          status: 'candidate',
          creator: account
        };
        console.log('======>');
        const result = {};
        // symbol , decimal 을 가져와서 셋팅한다.
        newApplication.symbol = await getSymbol(
          values.tokenContractAddr,
          account,
          library
        ).catch((error) => {
          result.error = error;
        });
        newApplication.decimals = await getDecimals(
          values.tokenContractAddr,
          account,
          library
        ).catch((error) => {
          result.error = error;
        });
        console.log('======>' + JSON.stringify(newApplication));

        if (!!result.error) {
          console.log('error : ' + JSON.stringify(result.error));
          enqueueSnackbar('Create Application fail', { variant: 'fail' });
          return;
        }
        dispatch(createApplication(newApplication));
        enqueueSnackbar('Create Application success', { variant: 'success' });
        history.push({
          pathname: '/app/taalswap/application/list'
        });
        // resetForm();
        // setSubmitting(false);
        // enqueueSnackbar('Create Application success', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors({ afterSubmit: error.code });
      }
    }
  });

  return (
    <Page
      title="New Application-Management | Minimal-UI"
      className={classes.root}
    >
      <Container>
        <HeaderDashboard
          heading="Create a new application"
          links={[{ name: 'New Application' }]}
        />
        <NewApplicationForm formik={formik} account={account} />
      </Container>
    </Page>
  );
}

export default ApplicationStart;
