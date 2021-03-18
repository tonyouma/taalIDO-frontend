import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fCurrency } from 'src/utils/formatNumber';
import editFill from '@iconify-icons/eva/edit-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2)
    }
  }
}));

// ----------------------------------------------------------------------

Summary.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  onEdit: PropTypes.func,
  enableEdit: PropTypes.bool,
  onApplyDiscount: PropTypes.func,
  enableDiscount: PropTypes.bool,
  className: PropTypes.string
};

function Summary({
  total,
  onEdit,
  discount,
  subtotal,
  shipping = null,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
  className
}) {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader
        title="Order Summary"
        action={
          enableEdit && (
            <Button
              size="small"
              type="button"
              onClick={onEdit}
              startIcon={<Icon icon={editFill} />}
            >
              Edit
            </Button>
          )
        }
      />

      <CardContent>
        <div className={classes.row}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Sub Total
          </Typography>
          <Typography variant="subtitle2">{fCurrency(subtotal)}</Typography>
        </div>

        <div className={classes.row}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Discount
          </Typography>
          <Typography variant="subtitle2">
            {discount ? fCurrency(-discount) : '-'}
          </Typography>
        </div>

        <div className={classes.row}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Shipping
          </Typography>
          <Typography variant="subtitle2">
            {shipping ? fCurrency(shipping) : shipping !== null ? 'Free' : '-'}
          </Typography>
        </div>

        <Divider sx={{ mb: 2 }} />

        <div className={classes.row}>
          <Typography variant="subtitle1">Total</Typography>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
              {fCurrency(total)}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              (VAT included if applicable)
            </Typography>
          </Box>
        </div>

        {enableDiscount && (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              placeholder="Discount codes / Gifts"
              value="DISCOUNT5"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="button"
                      onClick={() => onApplyDiscount(5)}
                      sx={{ mr: -0.5 }}
                    >
                      Apply
                    </Button>
                  </InputAdornment>
                )
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default Summary;
