import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import plusFill from '@iconify-icons/eva/plus-fill';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Button,
  Collapse,
  TextField,
  IconButton,
  Typography
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

function renderIcon(cardType) {
  if (cardType === 'master_card') {
    return '/static/icons/ic_mastercard.svg';
  } else if (cardType === 'visa') {
    return '/static/icons/ic_visa.svg';
  }
}

PaymentMethod.propTypes = {
  formik: PropTypes.object,
  cards: PropTypes.array,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func,
  className: PropTypes.string
};

function PaymentMethod({ formik, cards, isOpen, onOpen, onCancel, className }) {
  const classes = useStyles();
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card className={clsx(classes.root, className)}>
      <Typography
        variant="overline"
        sx={{ mb: 3, display: 'block', color: 'text.secondary' }}
      >
        Payment Method
      </Typography>

      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid key={card.id} item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                padding: 3,
                borderRadius: 1,
                border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
              }}
            >
              <Box
                component="img"
                alt="icon"
                src={renderIcon(card.cardType)}
                sx={{ mb: 1 }}
              />
              <Typography variant="subtitle2">{card.cardNumber}</Typography>
              <IconButton
                sx={{
                  top: 8,
                  right: 8,
                  position: 'absolute'
                }}
              >
                <Icon icon={moreVerticalFill} width={20} height={20} />
              </IconButton>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Button
          size="small"
          startIcon={<Icon icon={plusFill} />}
          onClick={onOpen}
        >
          Add new card
        </Button>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 1,
            bgcolor: 'background.neutral'
          }}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Typography variant="subtitle1" paragraph>
                Add new card
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Name on card"
                    {...getFieldProps('cardName')}
                    error={Boolean(touched.cardName && errors.cardName)}
                    helperText={touched.cardName && errors.cardName}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Card number"
                    {...getFieldProps('cardNumber')}
                    error={Boolean(touched.cardNumber && errors.cardNumber)}
                    helperText={touched.cardNumber && errors.cardNumber}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Expiration date"
                    placeholder="MM/YY"
                    {...getFieldProps('cardExpired')}
                    error={Boolean(touched.cardExpired && errors.cardExpired)}
                    helperText={touched.cardExpired && errors.cardExpired}
                  />
                </Grid>

                <Grid item xs={12} md={6} sx={{ mt: 1 }}>
                  <TextField
                    fullWidth
                    label="Cvv"
                    {...getFieldProps('cardCvv')}
                    error={Boolean(touched.cardCvv && errors.cardCvv)}
                    helperText={touched.cardCvv && errors.cardCvv}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 3,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <Button
                  type="button"
                  color="inherit"
                  variant="outlined"
                  onClick={onCancel}
                  sx={{ mr: 1.5 }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  pending={isSubmitting}
                >
                  Save Change
                </LoadingButton>
              </Box>
            </Form>
          </FormikProvider>
        </Box>
      </Collapse>
    </Card>
  );
}

export default PaymentMethod;
