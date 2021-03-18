import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import LazySize from 'src/components/LazySize';
import { fCurrency } from 'src/utils/formatNumber';
import { Link as RouterLink } from 'react-router-dom';
import { PreviewColor } from 'src/components/ColorUtility';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Link, Typography, CardContent } from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative'
  }
}));

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object,
  className: PropTypes.string
};

function ProductItem({ product, className, ...other }) {
  const classes = useStyles();
  const { name, cover, price, colors, status, priceSale } = product;
  const linkTo =
    PATH_APP.management.eCommerce.root + '/product/' + paramCase(name);

  return (
    <Card className={clsx(classes.root, className)} {...other}>
      <Box sx={{ paddingTop: '100%', position: 'relative' }}>
        {status && (
          <MLabel
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </MLabel>
        )}
        <LazySize
          alt={name}
          src={cover.small}
          size={`${cover.small} 600w, ${cover.medium} 960w`}
          sx={{ top: 0, width: '100%', height: '100%', position: 'absolute' }}
        />
      </Box>

      <CardContent>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="body2" noWrap>
            {name}
          </Typography>
        </Link>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <PreviewColor colors={colors} />

          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProductItem;
