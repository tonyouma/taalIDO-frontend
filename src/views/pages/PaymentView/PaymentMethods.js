import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import NewCreditCardForm from './NewCreditCardForm';
import plusFill from '@iconify-icons/eva/plus-fill';
import checkmarkCircle2Fill from '@iconify-icons/eva/checkmark-circle-2-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Radio,
  Hidden,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: 0,
      paddingTop: theme.spacing(5)
    }
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2.5),
    marginBottom: theme.spacing(1),
    justifyContent: 'space-between',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create('all'),
    border: `solid 1px ${theme.palette.grey[500_32]}`
  },
  hasChildren: {
    flexWrap: 'wrap'
  },
  isSelected: {
    boxShadow: theme.shadows[25].z8
  }
}));

// ----------------------------------------------------------------------

PaymentMethods.propTypes = {
  paymentOptions: PropTypes.array,
  cardOptions: PropTypes.array,
  formik: PropTypes.object,
  className: PropTypes.string
};

function PaymentMethods({ paymentOptions, cardOptions, formik, className }) {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const { values, getFieldProps } = formik;

  const handleCollapseIn = () => {
    setShow((prev) => !prev);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Payment Method
      </Typography>

      <RadioGroup {...getFieldProps('method')}>
        <Grid container spacing={2}>
          {paymentOptions.map((method) => {
            const { value, title, icons } = method;
            const hasChildren = value === 'credit_card';

            return (
              <Grid key={title} item xs={12}>
                <div
                  className={clsx(classes.option, {
                    [classes.isSelected]: values.method === value,
                    [classes.hasChildren]: hasChildren
                  })}
                >
                  <FormControlLabel
                    value={value}
                    control={
                      <Radio
                        checkedIcon={<Icon icon={checkmarkCircle2Fill} />}
                      />
                    }
                    label={
                      <Typography variant="subtitle2" sx={{ ml: 1 }}>
                        {title}
                      </Typography>
                    }
                    sx={{ py: 3, marginRight: 0 }}
                  />

                  <Hidden smDown>
                    <Box
                      sx={{
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {icons.map((icon) => (
                        <Box
                          key={icon}
                          component="img"
                          alt="logo card"
                          src={icon}
                          sx={{ '&:last-child': { ml: 1 } }}
                        />
                      ))}
                    </Box>
                  </Hidden>

                  {hasChildren && (
                    <Collapse in={values.method === 'credit_card'}>
                      <TextField
                        select
                        fullWidth
                        label="Card"
                        {...getFieldProps('card')}
                        SelectProps={{ native: true }}
                      >
                        {cardOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>

                      <Button
                        type="button"
                        size="small"
                        startIcon={
                          <Icon icon={plusFill} width={20} height={20} />
                        }
                        onClick={handleCollapseIn}
                        sx={{ my: 3 }}
                      >
                        Add new card
                      </Button>

                      <Collapse in={show}>
                        <NewCreditCardForm
                          formik={formik}
                          onCancel={handleCollapseOut}
                        />
                      </Collapse>
                    </Collapse>
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
    </div>
  );
}

export default PaymentMethods;
