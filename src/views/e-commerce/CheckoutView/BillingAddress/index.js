import clsx from 'clsx';
import faker from 'faker';
import Summary from '../Summary';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import NewAddress from './NewAddress';
import React, { useState } from 'react';
import plusFill from '@iconify-icons/eva/plus-fill';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Button,
  Typography,
  CardContent
} from '@material-ui/core';
import { MLabel } from 'src/theme';

// ----------------------------------------------------------------------

const ADDRESS_BOOKS = [
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Home',
    isDefault: true
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  },
  {
    receiver: faker.name.findName(),
    fullAddress: faker.address.streetAddress(),
    phone: faker.phone.phoneNumberFormat(),
    addressType: 'Office',
    isDefault: false
  }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    position: 'relative',
    marginBottom: theme.spacing(3)
  },
  action: {
    display: 'flex',
    marginTop: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: theme.spacing(3),
      bottom: theme.spacing(3)
    }
  }
}));

// ----------------------------------------------------------------------

AddressItem.propTypes = {
  address: PropTypes.object,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func
};

function AddressItem({ address, onNextStep, onCreateBilling }) {
  const classes = useStyles();
  const { receiver, fullAddress, addressType, phone, isDefault } = address;

  const handleCreateBilling = () => {
    onCreateBilling(address);
    onNextStep();
  };

  return (
    <Card className={classes.item}>
      <CardContent>
        <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1">{receiver}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            &nbsp;({addressType})
          </Typography>
          {isDefault && (
            <MLabel color="info" sx={{ ml: 1 }}>
              Default
            </MLabel>
          )}
        </Box>
        <Typography variant="body2" gutterBottom>
          {fullAddress}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {phone}
        </Typography>

        <div className={classes.action}>
          {!isDefault && (
            <Button variant="outlined" size="small" color="inherit">
              Delete
            </Button>
          )}
          <Box sx={{ mx: 0.5 }} />
          <Button variant="outlined" size="small" onClick={handleCreateBilling}>
            Deliver to this Address
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

BillingAddress.propTypes = {
  total: PropTypes.number,
  discount: PropTypes.number,
  subtotal: PropTypes.number,
  onBackStep: PropTypes.func,
  onNextStep: PropTypes.func,
  onCreateBilling: PropTypes.func,
  className: PropTypes.string
};

function BillingAddress({
  total,
  discount,
  subtotal,
  onBackStep,
  onNextStep,
  onCreateBilling,
  className
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {ADDRESS_BOOKS.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onNextStep={onNextStep}
              onCreateBilling={onCreateBilling}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Back
            </Button>
            <Button
              size="small"
              onClick={handleClickOpen}
              startIcon={<Icon icon={plusFill} />}
            >
              Add new address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Summary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <NewAddress
        open={open}
        onClose={handleClose}
        onNextStep={onNextStep}
        onCreateBilling={onCreateBilling}
      />
    </div>
  );
}

export default BillingAddress;
