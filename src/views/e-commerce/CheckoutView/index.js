import Cart from './Cart';
import Payment from './Payment';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import React, { useEffect } from 'react';
import OrderComplete from './OrderComplete';
import { PATH_APP } from 'src/routes/paths';
import BillingAddress from './BillingAddress';
import { useHistory } from 'react-router-dom';
import { HeaderDashboard } from 'src/layouts/Common';
import { useDispatch, useSelector } from 'react-redux';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import checkmarkFill from '@iconify-icons/eva/checkmark-fill';
import {
  getCart,
  resetCart,
  onGotoStep,
  deleteCart,
  onBackStep,
  onNextStep,
  applyDiscount,
  applyShipping,
  createBilling,
  increaseQuantity,
  decreaseQuantity
} from 'src/redux/slices/product';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector
} from '@material-ui/core';

// ----------------------------------------------------------------------

const STEPS = ['Cart', 'Billing & address', 'Payment'];

const useStyles = makeStyles((theme) => ({
  root: {},
  label: {
    ...theme.typography.subtitle2,
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

const QontoConnector = withStyles((theme) => ({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)'
  },
  active: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  completed: {
    '& $line': { borderColor: theme.palette.primary.main }
  },
  line: {
    borderTopWidth: 2,
    borderColor: theme.palette.divider
  }
}))(StepConnector);

function QontoStepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'divider',
        bgcolor: 'background.default'
      }}
    >
      {completed ? (
        <Box
          component={Icon}
          icon={checkmarkFill}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }}
        />
      ) : (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'currentColor'
          }}
        />
      )}
    </Box>
  );
}

function Checkout() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const { checkout } = useSelector((state) => state.product);
  const {
    cart,
    total,
    billing,
    discount,
    subtotal,
    shipping,
    activeStep
  } = checkout;
  const isComplete = activeStep === STEPS.length;

  useEffect(() => {
    if (isMountedRef.current) {
      dispatch(getCart(cart));
    }
  }, [dispatch, isMountedRef, cart]);

  const handleNextStep = () => {
    dispatch(onNextStep());
  };

  const handleBackStep = () => {
    dispatch(onBackStep());
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  const handleResetStep = () => {
    dispatch(resetCart());
    history.push(PATH_APP.management.eCommerce.products);
  };

  const handleDeleteCart = (productId) => {
    dispatch(deleteCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleApplyDiscount = (value) => {
    dispatch(applyDiscount(value));
  };

  const handleApplyShipping = (value) => {
    dispatch(applyShipping(value));
  };

  const handleCreateBilling = (value) => {
    dispatch(createBilling(value));
  };

  const renderContent = () => {
    if (activeStep === 0) {
      return (
        <Cart
          cart={cart}
          total={total}
          subtotal={subtotal}
          discount={discount}
          onNextStep={handleNextStep}
          onDelete={handleDeleteCart}
          onApplyDiscount={handleApplyDiscount}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
        />
      );
    }
    if (activeStep === 1) {
      return (
        <BillingAddress
          cart={cart}
          total={total}
          subtotal={subtotal}
          discount={discount}
          onBackStep={handleBackStep}
          onNextStep={handleNextStep}
          onCreateBilling={handleCreateBilling}
        />
      );
    }
    if (activeStep === 2) {
      return (
        <Payment
          total={total}
          billing={billing}
          subtotal={subtotal}
          discount={discount}
          shipping={shipping}
          onBackStep={handleBackStep}
          onComplete={handleNextStep}
          onGotoStep={handleGotoStep}
          onApplyShipping={handleApplyShipping}
        />
      );
    }
    return;
  };

  return (
    <Page
      title="Checkout-Ecommerce-Management | Minimal-UI"
      className={classes.root}
    >
      <Container>
        <HeaderDashboard
          heading="Checkout"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'E-Commerce', href: PATH_APP.management.eCommerce.root },
            { name: 'Checkout' }
          ]}
        />

        <Grid container justifyContent={isComplete ? 'center' : 'flex-start'}>
          <Grid item xs={12} md={8} sx={{ mb: 5 }}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {STEPS.map((label) => (
                <Step key={label}>
                  <StepLabel
                    StepIconComponent={QontoStepIcon}
                    classes={{ label: classes.label }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
        </Grid>

        {isComplete ? (
          <OrderComplete isComplete={isComplete} onReset={handleResetStep} />
        ) : (
          renderContent()
        )}
      </Container>
    </Page>
  );
}

export default Checkout;
