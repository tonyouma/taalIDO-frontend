import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import MoreButton from 'src/components/MoreButton';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const TASKS = [
  'Create FireStone Logo',
  'Add SCSS and JS files if required',
  'Stakeholder Meeting',
  'Scoping & Estimations',
  'Sprint Showcase'
];

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0.75, 0)
  },
  taskChecked: {
    '& .MuiFormControlLabel-label': {
      textDecoration: 'line-through',
      color: theme.palette.text.disabled
    }
  }
}));

// ----------------------------------------------------------------------

function TaskItem({ task, checked, formik, ...other }) {
  const classes = useStyles();
  const { getFieldProps } = formik;

  return (
    <div className={clsx(classes.listItem, { [classes.taskChecked]: checked })}>
      <FormControlLabel
        control={
          <Checkbox
            {...getFieldProps('checked')}
            value={task}
            checked={checked}
            {...other}
          />
        }
        label={task}
      />
      <MoreButton />
    </div>
  );
}

Tasks.propTypes = {
  className: PropTypes.string
};

function Tasks({ className, ...other }) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]]
    }
  });

  const { values, handleSubmit } = formik;

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Tasks" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {TASKS.map((task) => (
              <TaskItem
                key={task}
                task={task}
                formik={formik}
                checked={values.checked.includes(task)}
              />
            ))}
          </Form>
        </FormikProvider>
      </Box>
    </Card>
  );
}

export default Tasks;
