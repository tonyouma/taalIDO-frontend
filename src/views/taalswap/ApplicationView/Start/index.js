import * as Yup from 'yup';
import Page from 'src/components/Page';
import React, { useState } from 'react';
import NewApplicationForm from './NewApplicationForm';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent } from '@material-ui/core';
import { useFormik } from 'formik';
import { createApplication } from 'src/redux/slices/pool';
import moment from 'moment';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function ApplicationStart() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const NewApplicationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    category: Yup.string().required('Category is required'),
    projectDesc: Yup.string().required('Project Description is required'),
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
      .min(1)
      .max(100)
      .required('Fee Amount is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      category: 'defi',
      projectDesc: '',
      websiteUrl: '',
      email: '',
      telegramHandle: '',
      poolName: '',
      tokenContractAddr: '',
      tradeValue: '',
      tradeAmount: '',
      minFundRaise: '',
      access: 'private',
      minIndividuals: '',
      maxIndividuals: '',
      isAtomic: false,
      preferredStartDate: moment().add(1, 'd').toDate(),
      feeAmount: 1
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
          startDate: moment(values.preferredStartDate.toDateString()).unix(), // preferredStartDate 에포크타임으로 저장
          endDate: moment(values.preferredStartDate.toDateString())
            .add(30, 'd')
            .unix(), // startdate + 30일
          ratio: 1 / (values.tradeValue * Math.pow(10, -18)),
          progress: '',
          feeAmount: values.feeAmount,
          status: 'candidate'
        };
        console.log('======>' + newApplication.toString());
        dispatch(createApplication(newApplication));
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Create Application success', { variant: 'success' });
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

        <Card>
          <CardContent>
            <NewApplicationForm formik={formik} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}

export default ApplicationStart;
