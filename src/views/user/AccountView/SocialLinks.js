import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import fakeRequest from 'src/utils/fakeRequest';
import { useFormik, Form, FormikProvider } from 'formik';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import linkedinFill from '@iconify-icons/eva/linkedin-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import instagramFilled from '@iconify-icons/ant-design/instagram-filled';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, TextField, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const SOCIAL_LINKS_OPTIONS = [
  {
    value: 'facebookLink',
    icon: <Icon icon={facebookFill} height={24} />
  },
  {
    value: 'instagramLink',
    icon: <Icon icon={instagramFilled} height={24} />
  },
  {
    value: 'linkedinLink',
    icon: <Icon icon={linkedinFill} height={24} />
  },
  {
    value: 'twitterLink',
    icon: <Icon icon={twitterFill} height={24} />
  }
];

const useStyles = makeStyles((theme) => ({
  root: { padding: theme.spacing(3) },
  margin: { marginBottom: theme.spacing(3) }
}));

// ----------------------------------------------------------------------

SocialLinks.propTypes = {
  myProfile: PropTypes.object,
  className: PropTypes.string
};

function SocialLinks({ myProfile, className }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      facebookLink: myProfile.facebookLink,
      instagramLink: myProfile.instagramLink,
      linkedinLink: myProfile.linkedinLink,
      twitterLink: myProfile.twitterLink
    },
    onSubmit: async (values, { setSubmitting }) => {
      await fakeRequest(500);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Save success', { variant: 'success' });
    }
  });

  const { handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <Card className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          {SOCIAL_LINKS_OPTIONS.map((link) => (
            <TextField
              key={link.value}
              fullWidth
              {...getFieldProps(link.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">{link.icon}</InputAdornment>
                )
              }}
              className={classes.margin}
            />
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type="submit"
              variant="contained"
              pending={isSubmitting}
            >
              Save Changes
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </Card>
  );
}

export default SocialLinks;
