import { sum } from 'lodash';
import Sumary from './Sumary';
import Review from './Review';
import Slide from './Carousel';
import CartWidget from './CartWidget';
import { Icon } from '@iconify/react';
import Page from 'src/components/Page';
import Description from './Description';
import { sentenceCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { HeaderDashboard } from 'src/layouts/Common';
import clockFill from '@iconify-icons/eva/clock-fill';
import { useDispatch, useSelector } from 'react-redux';
import roundVerified from '@iconify-icons/ic/round-verified';
import { getProduct, addCart, onGotoStep } from 'src/redux/slices/product';
import roundVerifiedUser from '@iconify-icons/ic/round-verified-user';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Tab,
  Card,
  Grid,
  Divider,
  Skeleton,
  Container,
  Typography
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: roundVerified
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: clockFill
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: roundVerifiedUser
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  icon: {
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    justifyContent: 'center',
    height: theme.spacing(8),
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
  },
  tabList: {
    padding: theme.spacing(0, 3),
    backgroundColor: theme.palette.background.neutral
  },
  tab: { whiteSpace: 'nowrap' }
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton
        variant="rectangular"
        width="100%"
        sx={{ paddingTop: '100%', borderRadius: 2 }}
      />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

function ProductDetailsView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { name } = useParams();
  const { product, error, checkout } = useSelector((state) => state.product);
  const totalItems = sum(checkout.cart.map((item) => item.quantity));

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddCart = (product) => {
    dispatch(addCart(product));
  };

  const handleGotoStep = (step) => {
    dispatch(onGotoStep(step));
  };

  return (
    <Page
      title="Product Details-Ecommerce-Management | Minimal-UI"
      className={classes.root}
    >
      <Container>
        <HeaderDashboard
          heading="Product Details"
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Management', href: PATH_APP.management.root },
            { name: 'E-Commerce', href: PATH_APP.management.eCommerce.root },
            { name: sentenceCase(name) }
          ]}
        />

        <CartWidget length={totalItems} />

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <Slide product={product} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <Sumary
                    product={product}
                    cart={checkout.cart}
                    onAddCart={handleAddCart}
                    onGotoStep={handleGotoStep}
                  />
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box
                    sx={{
                      my: 2,
                      mx: 'auto',
                      maxWidth: 280,
                      textAlign: 'center'
                    }}
                  >
                    <div className={classes.icon}>
                      <Icon icon={item.icon} width={36} height={36} />
                    </div>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value={value}>
                <TabList onChange={handleChangeTab} className={classes.tabList}>
                  <Tab disableRipple value="1" label="Description" />
                  <Tab
                    disableRipple
                    value="2"
                    label={`Review (${product.reviews.length})`}
                    classes={{ wrapper: classes.tab }}
                  />
                </TabList>

                <Divider />

                <TabPanel value="1" className={classes.tabPanel}>
                  <Description product={product} />
                </TabPanel>
                <TabPanel value="2" className={classes.tabPanel}>
                  <Review product={product} />
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!product && SkeletonLoad}

        {error && <Typography variant="h6">404 Product not found</Typography>}
      </Container>
    </Page>
  );
}

export default ProductDetailsView;
