import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { PATH_APP } from 'src/routes/paths';
import { PATH_PAGE } from 'src/routes/paths';
import VerifyCodeForm from './VerifyCodeForm';
import fakeRequest from 'src/utils/fakeRequest';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Link, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    padding: theme.spacing(12, 0)
  },
  header: {
    top: 0,
    left: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5)
    }
  }
}));

// ----------------------------------------------------------------------

function VerifyCodeView() {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required('Code is required'),
    code2: Yup.number().required('Code is required'),
    code3: Yup.number().required('Code is required'),
    code4: Yup.number().required('Code is required'),
    code5: Yup.number().required('Code is required'),
    code6: Yup.number().required('Code is required')
  });

  const formik = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values) => {
      await fakeRequest(500);
      enqueueSnackbar('Verify success', { variant: 'success' });
      history.push(PATH_APP.root);
    }
  });

  return (
    <Page title="Verify | Minimal UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Button
            size="small"
            component={RouterLink}
            to={PATH_PAGE.auth.login}
            startIcon={<Icon icon={arrowIosBackFill} width={20} height={20} />}
            sx={{ mb: 3 }}
          >
            Back
          </Button>

          <Typography variant="h3" gutterBottom>
            Please check your email!
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            We have emailed a 6-digit confirmation code to acb@domain, please
            enter the code in below box to verify your email.
          </Typography>

          <Box sx={{ mt: 5, mb: 3 }}>
            <VerifyCodeForm formik={formik} />
          </Box>

          <Typography variant="body2" align="center">
            Don’t have a code? &nbsp;
            <Link variant="subtitle2" underline="none" onClick={() => {}}>
              Resend code
            </Link>
          </Typography>
        </Box>
      </Container>
    </Page>
  );
}

export default VerifyCodeView;
