import clsx from 'clsx';
import React from 'react';
import { sum } from 'lodash';
import Summary from '../Summary';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import ProductList from './ProductList';
import { PATH_APP } from 'src/routes/paths';
import Scrollbars from 'src/components/Scrollbars';
import EmptyContent from 'src/components/EmptyContent';
import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Button,
  CardHeader,
  Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

Cart.propTypes = {
  cart: PropTypes.array,
  total: PropTypes.number,
  subtotal: PropTypes.number,
  discount: PropTypes.number,
  onDelete: PropTypes.func,
  onNextStep: PropTypes.func,
  onApplyDiscount: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  className: PropTypes.string
};

function Cart({
  cart,
  total,
  subtotal,
  discount,
  onDelete,
  onNextStep,
  onApplyDiscount,
  onIncreaseQuantity,
  onDecreaseQuantity,
  className
}) {
  const classes = useStyles();
  const isEmptyCart = cart.length === 0;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        onNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit } = formik;
  const totalItems = sum(values.products.map((item) => item.quantity));

  return (
    <div className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader
                  title={
                    <Typography variant="h6">
                      Card
                      <Typography
                        component="span"
                        sx={{ color: 'text.secondary' }}
                      >
                        &nbsp;({totalItems} item)
                      </Typography>
                    </Typography>
                  }
                />

                {!isEmptyCart ? (
                  <Scrollbars>
                    <ProductList
                      formik={formik}
                      onDelete={onDelete}
                      onIncreaseQuantity={onIncreaseQuantity}
                      onDecreaseQuantity={onDecreaseQuantity}
                    />
                  </Scrollbars>
                ) : (
                  <EmptyContent
                    title="Cart is empty"
                    description="Look like you have no items in your shopping cart."
                    img="/static/illustrations/illustration_empty_cart.svg"
                  />
                )}
              </Card>

              <Box sx={{ mt: 3 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={PATH_APP.management.eCommerce.root}
                  startIcon={<Icon icon={arrowIosBackFill} />}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Summary
                total={total}
                enableDiscount
                discount={discount}
                subtotal={subtotal}
                onApplyDiscount={onApplyDiscount}
              />
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled={values.products.length === 0}
              >
                Check Out
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default Cart;
