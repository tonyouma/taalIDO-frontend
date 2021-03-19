import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Block from 'src/components/Block';
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  FormHelperText
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  },
  helperText: {
    padding: theme.spacing(0, 2)
  }
}));

// ----------------------------------------------------------------------

NewApplicationDetailsView.propTypes = {
  formik: PropTypes.object.isRequired,
  className: PropTypes.string
};

function NewApplicationDetailsView({ formik, className, ...other }) {
  const classes = useStyles();
  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        className={clsx(classes.root, className)}
        {...other}
      >
        <Block title="Contact information" className={classes.margin}>
          <TextField
            fullWidth
            label="Name"
            size="small"
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="email"
            size="small"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="telegram id"
            size="small"
            {...getFieldProps('telegramId')}
            error={Boolean(touched.telegramId && errors.telegramId)}
            helperText={touched.telegramId && errors.telegramId}
            className={classes.margin}
          />
        </Block>

        <Block title="project information" className={classes.margin}>
          <TextField
            fullWidth
            label="project name"
            size="small"
            {...getFieldProps('projectName')}
            error={Boolean(touched.projectName && errors.projectName)}
            helperText={touched.projectName && errors.projectName}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="token contract address"
            size="small"
            {...getFieldProps('contractAddress')}
            error={Boolean(touched.contractAddress && errors.contractAddress)}
            helperText={touched.contractAddress && errors.contractAddress}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="project description"
            size="small"
            {...getFieldProps('projectDesc')}
            error={Boolean(touched.projectDesc && errors.projectDesc)}
            helperText={touched.projectDesc && errors.projectDesc}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="website url"
            size="small"
            {...getFieldProps('websiteUrl')}
            error={Boolean(touched.websiteUrl && errors.websiteUrl)}
            helperText={touched.websiteUrl && errors.websiteUrl}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="whitepaper"
            size="small"
            {...getFieldProps('whitePaper')}
            error={Boolean(touched.whitePaper && errors.whitePaper)}
            helperText={touched.whitePaper && errors.whitePaper}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="token information"
            size="small"
            {...getFieldProps('tokenInformation')}
            error={Boolean(touched.tokenInformation && errors.tokenInformation)}
            helperText={touched.tokenInformation && errors.tokenInformation}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="twitter url"
            size="small"
            {...getFieldProps('twitterUrl')}
            error={Boolean(touched.twitterUrl && errors.twitterUrl)}
            helperText={touched.twitterUrl && errors.twitterUrl}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="telegram handle"
            size="small"
            {...getFieldProps('telegramHandle')}
            error={Boolean(touched.telegramHandle && errors.telegramHandle)}
            helperText={touched.telegramHandle && errors.telegramHandle}
            className={classes.margin}
          />
          <TextField
            fullWidth
            label="roadmaps"
            size="small"
            {...getFieldProps('roadmaps')}
            error={Boolean(touched.roadmaps && errors.roadmaps)}
            helperText={touched.roadmaps && errors.roadmaps}
            className={classes.margin}
          />
        </Block>

        <Block title="investments and progresses" className={classes.margin}>
          <TextField
            fullWidth
            label="github url"
            size="small"
            {...getFieldProps('githubUrl')}
            error={Boolean(touched.githubUrl && errors.namgithubUrle)}
            helperText={touched.githubUrl && errors.githubUrl}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="amount of fund raised"
            size="small"
            {...getFieldProps('amountRaise')}
            error={Boolean(touched.amountRaise && errors.amountRaise)}
            helperText={touched.amountRaise && errors.amountRaise}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="(investors)"
            size="small"
            {...getFieldProps('investors')}
            error={Boolean(touched.investors && errors.investors)}
            helperText={touched.investors && errors.investors}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="amount of fund planning to raise on TaalSwap"
            size="small"
            {...getFieldProps('amountRaisePlan')}
            error={Boolean(touched.amountRaisePlan && errors.amountRaisePlan)}
            helperText={touched.amountRaisePlan && errors.amountRaisePlan}
            className={classes.margin}
          />

          <TextField
            fullWidth
            label="preferred IDO launch date"
            size="small"
            {...getFieldProps('launchDate')}
            error={Boolean(touched.launchDate && errors.launchDate)}
            helperText={touched.launchDate && errors.launchDate}
            className={classes.margin}
          />
        </Block>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Create
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default NewApplicationDetailsView;
