import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { fDate } from 'src/utils/formatTime';
import { fCurrency } from 'src/utils/formatNumber';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Button, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {},
  invoiceItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

InvoiceHistory.propTypes = {
  invoices: PropTypes.array,
  className: PropTypes.string
};

function InvoiceHistory({ invoices, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Invoice History
      </Typography>

      {invoices.map((invoice) => (
        <div key={invoice.id} className={classes.invoiceItem}>
          <Typography variant="body2" sx={{ minWidth: 160 }}>
            {fDate(invoice.createdAt)}
          </Typography>
          <Typography variant="body2">{fCurrency(invoice.price)}</Typography>
          <Link component={RouterLink} to="#">
            PDF
          </Link>
        </div>
      ))}

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" endIcon={<Icon icon={arrowIosForwardFill} />}>
          All invoices
        </Button>
      </Box>
    </div>
  );
}

export default InvoiceHistory;
