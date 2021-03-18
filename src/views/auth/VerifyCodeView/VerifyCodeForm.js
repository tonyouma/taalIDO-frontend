import React from 'react';
import { Form, FormikProvider } from 'formik';
import { LoadingButton } from '@material-ui/lab';
import maxLengthCheck from 'src/utils/maxLengthCheck';
import { makeStyles } from '@material-ui/core/styles';
import { Box, OutlinedInput, FormHelperText } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  input: {
    width: 36,
    height: 36,
    padding: 0,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 56,
      height: 56
    }
  }
}));

// ----------------------------------------------------------------------

function VerifyCodeForm({ formik }) {
  const classes = useStyles();
  const {
    values,
    errors,
    isValid,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {Object.keys(values).map((item) => (
            <Box key={item} sx={{ mx: 1 }}>
              <OutlinedInput
                {...getFieldProps(item)}
                type="number"
                placeholder="-"
                onInput={maxLengthCheck}
                inputProps={{ maxLength: 1 }}
                error={Boolean(touched[item] && errors[item])}
                classes={{ input: classes.input }}
              />
            </Box>
          ))}
        </Box>

        <FormHelperText error={!isValid} style={{ textAlign: 'right' }}>
          {!isValid && 'Code is required'}
        </FormHelperText>

        <Box sx={{ mt: 3 }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            pending={isSubmitting}
          >
            Verify
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}

export default VerifyCodeForm;
