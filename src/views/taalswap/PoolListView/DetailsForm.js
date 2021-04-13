import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useFormik, Form, FormikProvider } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogContent,
  DialogActions,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const getInitialValues = (pool) => {
  const _pool = {
    title: '',
    description: '',
    textColor: '#1890FF'
  };

  return _pool;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

DetailsForm.propTypes = {
  pool: PropTypes.object,
  onCancel: PropTypes.func,
  onClickSwap: PropTypes.func
};

function DetailsForm({ pool, onCancel, onClickSwap }) {
  const classes = useStyles();

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(pool),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        // if (event) {
        //   dispatch(updateEvent(event.id, newEvent));
        //   enqueueSnackbar('Update event success', { variant: 'success' });
        // } else {
        //   dispatch(createEvent(newEvent));
        //   enqueueSnackbar('Create event success', { variant: 'success' });
        // }
        resetForm();
        onCancel();
        onClickSwap();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { handleSubmit, isSubmitting } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="subtitle1" className={classes.margin}>
            Pool : {pool.poolName}
          </Typography>
          <Typography variant="subtitle1" className={classes.margin}>
            Token : {pool.tokenContractAddr}
          </Typography>
          <Typography variant="subtitle1" className={classes.margin}>
            Max : {pool.maxIndividuals} Tokens
          </Typography>
          <Typography variant="subtitle1" className={classes.margin}>
            Whitelisted : {pool.access}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
            pendingIndicator="Loading..."
            onClick={onClickSwap}
          >
            Swap
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default DetailsForm;
