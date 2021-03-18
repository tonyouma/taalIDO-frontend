import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import infoFill from '@iconify-icons/eva/info-fill';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Popover,
  TextField,
  Typography,
  InputAdornment
} from '@material-ui/core';
import { MIconButton } from 'src/theme';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2.5),
    marginBottom: theme.spacing(2.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.grey[200]
  },
  paper: {
    maxWidth: 200,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper
  },
  margin: {
    marginBottom: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

NewCreditCard.propTypes = {
  formik: PropTypes.object,
  onCancel: PropTypes.func,
  className: PropTypes.string
};

function NewCreditCard({ formik, onCancel, className }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(null);
  const { values, resetForm, getFieldProps } = formik;

  const handleCancel = () => {
    onCancel();
    resetForm({
      values: {
        ...values,
        newCardName: '',
        newCardNumber: '',
        newCardExpired: '',
        newCardCvv: ''
      }
    });
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant="subtitle1" paragraph>
        Add new card
      </Typography>
      <TextField
        fullWidth
        size="small"
        label="Name on card"
        {...getFieldProps('newCardName')}
        className={classes.margin}
      />

      <TextField
        fullWidth
        size="small"
        label="Card number"
        {...getFieldProps('newCardNumber')}
        className={classes.margin}
      />

      <Grid container spacing={2} className={classes.margin}>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="MM/YY"
            {...getFieldProps('newCardExpired')}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="CVV"
            {...getFieldProps('newCardCvv')}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <MIconButton
                    size="small"
                    edge="end"
                    onClick={(e) => setIsOpen(e.currentTarget)}
                  >
                    <Icon icon={infoFill} />
                  </MIconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button type="button" fullWidth onClick={handleCancel}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button type="button" fullWidth variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>

      <Popover
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        onClose={() => setIsOpen(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        classes={{ paper: classes.paper }}
      >
        <Typography variant="body2" align="center">
          Three-digit number on the back of your VISA card
        </Typography>
      </Popover>
    </div>
  );
}

export default NewCreditCard;
