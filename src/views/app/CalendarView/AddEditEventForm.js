import React from 'react';
import * as Yup from 'yup';
import { merge } from 'lodash';
import PropTypes from 'prop-types';
import { isBefore } from 'date-fns';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import trash2Fill from '@iconify-icons/eva/trash-2-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import { PickerSingleColor } from 'src/components/ColorUtility';
import MobileDateTimePicker from '@material-ui/lab/MobileDateTimePicker';
import {
  createEvent,
  updateEvent,
  deleteEvent
} from 'src/redux/slices/calendar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Switch,
  Tooltip,
  TextField,
  IconButton,
  DialogContent,
  DialogActions,
  FormHelperText,
  FormControlLabel
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

const getInitialValues = (event, range) => {
  const _event = {
    title: '',
    description: '',
    textColor: '#1890FF',
    allDay: false,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

AddEditEventForm.propTypes = {
  event: PropTypes.object,
  range: PropTypes.object,
  onCancel: PropTypes.func
};

function AddEditEventForm({ event, range, onCancel }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isCreating = !event;

  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000)
  });

  const formik = useFormik({
    initialValues: getInitialValues(event, range),
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
        if (event) {
          dispatch(updateEvent(event.id, newEvent));
          enqueueSnackbar('Update event success', { variant: 'success' });
        } else {
          dispatch(createEvent(newEvent));
          enqueueSnackbar('Create event success', { variant: 'success' });
        }
        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue
  } = formik;

  const handleDelete = async () => {
    try {
      onCancel();
      dispatch(deleteEvent(event.id));
      enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            {...getFieldProps('title')}
            error={Boolean(touched.title && errors.title)}
            helperText={touched.title && errors.title}
            className={classes.margin}
          />

          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText={touched.description && errors.description}
            className={classes.margin}
          />

          <FormControlLabel
            control={
              <Switch checked={values.allDay} {...getFieldProps('allDay')} />
            }
            label="All day"
            className={classes.margin}
          />

          <MobileDateTimePicker
            label="Start date"
            value={values.start}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('start', date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth className={classes.margin} />
            )}
          />

          <MobileDateTimePicker
            label="End date"
            value={values.end}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('end', date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth className={classes.margin} />
            )}
          />

          {isDateError && (
            <FormHelperText error>
              End date must be later than start date
            </FormHelperText>
          )}

          <PickerSingleColor
            {...getFieldProps('textColor')}
            colors={COLOR_OPTIONS}
          />
        </DialogContent>

        <DialogActions>
          {!isCreating && (
            <Tooltip title="Delete Event">
              <IconButton onClick={handleDelete}>
                <Icon icon={trash2Fill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
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
            Add
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default AddEditEventForm;
