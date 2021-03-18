import * as Yup from 'yup';
import { useFormik } from 'formik';
import Logo from 'src/components/Logo';
import Page from 'src/components/Page';
import useAuth from 'src/hooks/useAuth';
import React, { useState } from 'react';
import { PATH_PAGE } from 'src/routes/paths';
import ResetPasswordForm from './ResetPasswordForm';
import { Link as RouterLink } from 'react-router-dom';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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

function ResetPasswordView() {
  const classes = useStyles();
  const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const [sent, setSent] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: 'demo@minimals.cc'
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(values.email);
        if (isMountedRef.current) {
          setSent(true);
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

  return (
    <Page title="Reset Password | Minimal UI" className={classes.root}>
      <header className={classes.header}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </header>

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" gutterBottom>
                Forgot your password?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </Typography>

              <ResetPasswordForm formik={formik} />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
                sx={{ mt: 1 }}
              >
                Back
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                alt="sent email"
                src="/static/icons/ic_email_sent.svg"
                sx={{ mb: 5, mx: 'auto' }}
              />
              <Typography variant="h3" gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to &nbsp;
                <strong>{formik.values.email}</strong>
                <br />
                Please check your email.
              </Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.auth.login}
                sx={{ mt: 5 }}
              >
                Back
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default ResetPasswordView;
