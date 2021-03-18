import clsx from 'clsx';
import React from 'react';
import faker from 'faker';
import { sample } from 'lodash';
import PropTypes from 'prop-types';
import { fCurrency } from 'src/utils/formatNumber';
import Scrollbars from 'src/components/Scrollbars';
import { getImgProduct } from 'src/utils/getImages';
import { Link as RouterLink } from 'react-router-dom';
import { PreviewColor } from 'src/components/ColorUtility';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Card,
  CardHeader,
  Typography,
  CardContent
} from '@material-ui/core';

// ----------------------------------------------------------------------

const PRODUCTS = [...Array(5)].map((product, index) => {
  const setIndex = index + 12;
  return {
    name: faker.commerce.productName(),
    image: getImgProduct(128, setIndex),
    price: faker.random.number({ min: 4, max: 49, precision: 0.1 }),
    priceSale: sample([
      0,
      faker.random.number({ min: 49, max: 99, precision: 0.1 })
    ]),
    colors: (index === 1 && [faker.vehicle.color(), faker.vehicle.color()]) ||
      (index === 2 && [
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color()
      ]) || [
        faker.internet.color(),
        faker.internet.color(),
        faker.internet.color(),
        faker.internet.color()
      ]
  };
});

const useStyles = makeStyles((theme) => ({
  root: {},
  listItem: {
    display: 'flex',
    alignItems: 'center',
    '&:not(:first-child)': {
      marginTop: theme.spacing(3)
    }
  }
}));

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

function ProductItem({ product }) {
  const classes = useStyles();
  const { name, image, price, priceSale } = product;
  const hasSale = priceSale > 0;

  return (
    <div className={classes.listItem}>
      <Box
        component="img"
        alt={name}
        src={image}
        sx={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 1.5 }}
      />

      <Box sx={{ flexGrow: 1, minWidth: 180, mx: 2 }}>
        <Typography variant="subtitle2" noWrap>
          <Link component={RouterLink} to="#" color="text.primary">
            {name}
          </Link>
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {hasSale && (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
            >
              {fCurrency(priceSale)}
            </Typography>
          )}
          &nbsp;
          <Typography
            variant="body2"
            color={(priceSale && 'error') || 'textSecondary'}
          >
            {fCurrency(price)}
          </Typography>
        </Box>
      </Box>

      <PreviewColor limit={3} colors={product.colors} sx={{ minWidth: 72 }} />
    </div>
  );
}

LatestProducts.propTypes = {
  className: PropTypes.string
};

function LatestProducts({ className, ...other }) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <CardHeader title="Latest Products" />
      <CardContent>
        <Scrollbars>
          {PRODUCTS.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
        </Scrollbars>
      </CardContent>
    </Card>
  );
}

export default LatestProducts;
