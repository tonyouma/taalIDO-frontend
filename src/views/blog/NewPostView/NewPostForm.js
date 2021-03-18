import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import { QuillEditor } from 'src/components/Editor';
import { UploadSingleFile } from 'src/components/Upload';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  TextField,
  Typography,
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

PostDetailsView.propTypes = {
  formik: PropTypes.object.isRequired,
  onOpenPreview: PropTypes.func,
  className: PropTypes.string
};

function PostDetailsView({ formik, onOpenPreview, className, ...other }) {
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
        <TextField
          fullWidth
          label="Post Title"
          {...getFieldProps('title')}
          error={Boolean(touched.title && errors.title)}
          helperText={touched.title && errors.title}
          className={classes.margin}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={5}
          label="Description"
          {...getFieldProps('description')}
          error={Boolean(touched.description && errors.description)}
          helperText={touched.description && errors.description}
          className={classes.margin}
        />

        <div className={classes.margin}>
          <Typography
            gutterBottom
            variant="subtitle2"
            sx={{ color: 'text.secondary' }}
          >
            Content
          </Typography>
          <QuillEditor
            id="post-content"
            value={values.content}
            onChange={(val) => setFieldValue('content', val)}
            error={Boolean(touched.content && errors.content)}
          />
          <FormHelperText error className={classes.helperText}>
            {touched.content && errors.content}
          </FormHelperText>
        </div>

        <div className={classes.margin}>
          <Typography
            gutterBottom
            variant="subtitle2"
            sx={{ color: 'text.secondary' }}
          >
            Cover
          </Typography>
          <UploadSingleFile
            value={values.cover}
            onChange={(val) => setFieldValue('cover', val)}
            caption="(Only *.jpeg and *.png images will be accepted)"
            error={Boolean(touched.cover && errors.cover)}
          />
          <FormHelperText error className={classes.helperText}>
            {touched.cover && errors.cover}
          </FormHelperText>
        </div>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            color="inherit"
            variant="outlined"
            onClick={onOpenPreview}
            sx={{ mr: 1.5 }}
          >
            Preview
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Post
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default PostDetailsView;
