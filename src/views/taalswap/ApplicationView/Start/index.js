import * as Yup from 'yup';
import Page from 'src/components/Page';
import React, { useState } from 'react';
import NewApplicationForm from './NewApplicationForm';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import { fData } from 'src/utils/formatNumber';
import fakeRequest from 'src/utils/fakeRequest';
import { HeaderDashboard } from 'src/layouts/Common';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, CardContent } from '@material-ui/core';
import { useFormik } from 'formik';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

function ApplicationStart() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const NewApplicationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('e-mail is required'),
    telegramId: Yup.string().required('telegram id is required')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      telegramId: ''
    },
    validationSchema: NewApplicationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar('Post success', { variant: 'success' });
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
