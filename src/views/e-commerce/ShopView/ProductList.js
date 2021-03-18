import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {}
}));

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Grid container spacing={3}>
    {[...Array(12)].map((item, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton
          variant="rectangular"
          width="100%"
          sx={{ paddingTop: '115%', borderRadius: 2 }}
        />
      </Grid>
    ))}
  </Grid>
);

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  isLoad: PropTypes.bool,
  className: PropTypes.string
};

function ProductList({ products, isLoad, className, ...other }) {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
      className={clsx(classes.root, className)}
      {...other}
    >
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ProductItem product={product} />
        </Grid>
      ))}

      {isLoad && SkeletonLoad}
    </Grid>
  );
}

export default ProductList;
