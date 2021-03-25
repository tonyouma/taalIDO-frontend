import * as Yup from 'yup';
import Page from 'src/components/Page';
import React, { useState } from 'react';
import NewApplicationForm from './NewApplicationForm';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { PATH_APP } from 'src/routes/paths';
import { fData } from 'src/utils/formatNumber';
import fakeRequest from 'src/utils/fakeRequest';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent } from '@material-ui/core';
import { useFormik } from 'formik';
import { createApplication } from 'src/redux/slices/application';
import axios from 'axios';

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
    email: Yup.string().email().required('e-mail is required'),
    telegramId: Yup.string().required('telegram id is required'),
    projectName: Yup.string().required('project name is required'),
    tokenContractAddr: Yup.string().required(
      'token contract address is required'
    ),
    projectDesc: Yup.string().required('project description is required'),
    websiteUrl: Yup.string().required('website url is required'),
    whitePaper: Yup.string().required('whitepaper is required'),
    tokenInformation: Yup.string().required('token information is required'),
    twitterUrl: Yup.string().required('twitter url is required'),
    telegramHandle: Yup.string().required('telegram handle is required'),
    roadmaps: Yup.string().required('roadmaps is required'),
    githubUrl: Yup.string().required('github url is required'),
    amountRaise: Yup.number()
      .positive()
      .required('amount of fund raised is required'),
    investors: Yup.string().required('(investors) is required'),
    amountRaisePlan: Yup.number()
      .positive()
      .required('amount of fund planning to raise on TaalSwap is required'),
    launchDate: Yup.string().required('preferred IDO lanunch date is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      telegramId: '',
      projectName: '',
      tokenContractAddr: '',
      projectDesc: '',
      websiteUrl: '',
      whitePaper: '',
      tokenInformation: '',
      twitterUrl: '',
      telegramHandle: '',
      roadmaps: '',
      githubUrl: '',
      amountRaise: '',
      investors: '',
      amountRaisePlan: '',
      launchDate: ''
    },
    validationSchema: NewApplicationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const newApplication = {
          name: values.name,
          email: values.email,
          telegramId: values.telegramId,
          projectName: values.projectName,
          tokenContractAddr: values.tokenContractAddr,
          projectDesc: values.projectDesc,
          websiteUrl: values.websiteUrl,
          whitePaper: values.whitePaper,
          tokenInformation: values.tokenInformation,
          twitterUrl: values.twitterUrl,
          telegramHandle: values.telegramHandle,
          roadmaps: values.roadmaps,
          githubUrl: values.githubUrl,
          amountRaise: values.amountRaise,
          investors: values.investors,
          amountRaisePlan: values.amountRaisePlan,
          launchDate: values.launchDate
        };
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
