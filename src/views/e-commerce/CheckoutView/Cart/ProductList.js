import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import LazySize from 'src/components/LazySize';
import getColorName from 'src/utils/getColorName';
import { fCurrency } from 'src/utils/formatNumber';
import plusFill from '@iconify-icons/eva/plus-fill';
import minusFill from '@iconify-icons/eva/minus-fill';
import trash2Fill from '@iconify-icons/eva/trash-2-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer
} from '@material-ui/core';
import { MIconButton } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  quantity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0.5, 0.75),
    borderRadius: theme.shape.borderRadius,
    border: `solid 1px ${theme.palette.grey[500_32]}`
  }
}));

// ----------------------------------------------------------------------

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ available, quantity, onIncrease, onDecrease }) {
  const classes = useStyles();

  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <div className={classes.quantity}>
        <MIconButton
          size="small"
          color="inherit"
          onClick={onDecrease}
          disabled={quantity <= 1}
        >
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton
          size="small"
          color="inherit"
          onClick={onIncrease}
          disabled={quantity >= available}
        >
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </div>
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available: {available}
      </Typography>
    </Box>
  );
}

ProductList.propTypes = {
  formik: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  className: PropTypes.string
};

function ProductList({
  formik,
  onDelete,
  onIncreaseQuantity,
  onDecreaseQuantity,
  className
}) {
  const classes = useStyles();
  const { products } = formik.values;

  return (
    <div className={clsx(classes.root, className)}>
      <TableContainer sx={{ minWidth: 720, mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => {
              const {
                id,
                name,
                size,
                price,
                color,
                cover,
                quantity,
                available
              } = product;
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LazySize
                        alt="product image"
                        src={cover.thumb}
                        sx={{
                          mr: 2,
                          width: 64,
                          height: 64,
                          borderRadius: 1.5
                        }}
                      />
                      <Box>
                        <Typography
                          noWrap
                          variant="subtitle2"
                          sx={{ maxWidth: 240 }}
                        >
                          {name}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Typography variant="body2">
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.secondary' }}
                            >
                              size:&nbsp;
                            </Typography>
                            {size}
                          </Typography>
                          <Divider
                            orientation="vertical"
                            sx={{ mx: 1, height: 16 }}
                          />
                          <Typography variant="body2">
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: 'text.secondary' }}
                            >
                              color:&nbsp;
                            </Typography>
                            {getColorName(color)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell align="left">{fCurrency(price)}</TableCell>

                  <TableCell align="left">
                    <Incrementer
                      quantity={quantity}
                      available={available}
                      onDecrease={() => onDecreaseQuantity(id)}
                      onIncrease={() => onIncreaseQuantity(id)}
                    />
                  </TableCell>

                  <TableCell align="right">
                    {fCurrency(price * quantity)}
                  </TableCell>

                  <TableCell align="right">
                    <MIconButton onClick={() => onDelete(id)}>
                      <Icon icon={trash2Fill} width={20} height={20} />
                    </MIconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProductList;
