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

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#94D82D', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E' // theme.palette.error.darker
];

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
  onCancel: PropTypes.func
};

function DetailsForm({ pool, onCancel }) {
  const classes = useStyles();

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(pool),
    validationSchema: EventSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const newEvent = {
          title: values.title,
          description: values.description,
          textColor: values.textColor,
          allDay: values.allDay,
          start: values.start,
          end: values.end
        };
        // if (event) {
        //   dispatch(updateEvent(event.id, newEvent));
        //   enqueueSnackbar('Update event success', { variant: 'success' });
        // } else {
        //   dispatch(createEvent(newEvent));
        //   enqueueSnackbar('Create event success', { variant: 'success' });
        // }
        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const {
    handleSubmit,
    isSubmitting
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Pool : {pool}
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
          >
            Swap
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default DetailsForm;
