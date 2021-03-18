import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { PATH_APP } from 'src/routes/paths';
import { useHistory } from 'react-router-dom';
import plusFill from '@iconify-icons/eva/plus-fill';
import minusFill from '@iconify-icons/eva/minus-fill';
import twitterFill from '@iconify-icons/eva/twitter-fill';
import linkedinFill from '@iconify-icons/eva/linkedin-fill';
import facebookFill from '@iconify-icons/eva/facebook-fill';
import { PickerSingleColor } from 'src/components/ColorUtility';
import { fShortenNumber, fCurrency } from 'src/utils/formatNumber';
import { useFormik, Form, FormikProvider, useField } from 'formik';
import instagramFilled from '@iconify-icons/ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify-icons/ic/round-add-shopping-cart';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Link,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { MIconButton, MLabel } from 'src/theme';
import { MButton } from 'src/theme';

// ----------------------------------------------------------------------

const SOCIALS = [
  {
    name: 'Facebook',
    icon: <Icon icon={facebookFill} width={20} height={20} color="#1877F2" />
  },
  {
    name: 'Instagram',
    icon: <Icon icon={instagramFilled} width={20} height={20} color="#D7336D" />
  },
  {
    name: 'Linkedin',
    icon: <Icon icon={linkedinFill} width={20} height={20} color="#006097" />
  },
  {
    name: 'Twitter',
    icon: <Icon icon={twitterFill} width={20} height={20} color="#1C9CEA" />
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    [theme.breakpoints.up('1368')]: {
      padding: theme.spacing(5, 8)
    }
  },
  helpText: {
    textAlign: 'right',
    margin: 0,
    marginTop: theme.spacing(1)
  },
  colors: {
    maxWidth: 144,
    justifyContent: 'flex-end'
  }
}));

// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton
        size="small"
        color="inherit"
        disabled={value <= 1}
        onClick={decrementQuantity}
      >
        <Icon icon={minusFill} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {value}
      </Typography>
      <MIconButton
        size="small"
        color="inherit"
        disabled={value >= available}
        onClick={incrementQuantity}
      >
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

Sumary.propTypes = {
  product: PropTypes.object,
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  className: PropTypes.string
};

function Sumary({ product, cart, onAddCart, onGotoStep, className, ...other }) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const {
    id,
    name,
    sizes,
    price,
    cover,
    status,
    colors,
    available,
    priceSale,
    totalRating,
    totalReview,
    inventoryType
  } = product;

  const alreadyProduct = cart.map((item) => item.id).includes(id);
  const isMaxQuantity =
    cart.filter((item) => item.id === id).map((item) => item.quantity)[0] >=
    available;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: id,
      name: name,
      cover: cover,
      available: available,
      price: price,
      color: colors[0],
      size: sizes[4],
      quantity: available < 1 ? 0 : 1
    },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        if (!alreadyProduct) {
          onAddCart({
            ...values,
            subtotal: values.price * values.quantity
          });
        }
        setSubmitting(false);
        onGotoStep(0);
        history.push(PATH_APP.management.eCommerce.checkout);
      } catch (error) {
        setErrors({ afterSubmit: error.code });
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleAddCart = async () => {
    try {
      onAddCart({
        ...values,
        subtotal: values.price * values.quantity
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={clsx(classes.root, className)} {...other}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <MLabel
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={inventoryType === 'in_stock' ? 'success' : 'error'}
            sx={{ textTransform: 'uppercase' }}
          >
            {sentenceCase(inventoryType)}
          </MLabel>
          <Typography
            variant="overline"
            sx={{
              mt: 2,
              mb: 1,
              display: 'block',
              color: status === 'sale' ? 'error.main' : 'info.main'
            }}
          >
            {status}
          </Typography>

          <Typography variant="h5" paragraph>
            {name}
          </Typography>

          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Rating value={totalRating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(totalReview)}
              reviews)
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ mb: 3 }}>
            <Box
              component="span"
              sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
            >
              {priceSale && fCurrency(priceSale)}
            </Box>
            &nbsp;{fCurrency(price)}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box
            sx={{
              my: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Color
            </Typography>
            <PickerSingleColor
              {...getFieldProps('color')}
              colors={colors}
              className={clsx({ [classes.colors]: colors.length > 4 })}
            />
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Size
            </Typography>
            <TextField
              select
              size="small"
              {...getFieldProps('size')}
              SelectProps={{ native: true }}
              FormHelperTextProps={{ className: classes.helpText }}
              helperText={
                <Link href="#" underline="always" color="text.primary">
                  Size Chart
                </Link>
              }
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </TextField>
          </Box>

          <Box
            sx={{
              mb: 3,
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
              Quantity
            </Typography>

            <div>
              <Incrementer name="quantity" available={available} />
              <Typography
                variant="caption"
                sx={{
                  mt: 1,
                  display: 'block',
                  textAlign: 'right',
                  color: 'text.secondary'
                }}
              >
                Available: {available}
              </Typography>

              <FormHelperText error>
                {touched.quantity && errors.quantity}
              </FormHelperText>
            </div>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <MButton
                  fullWidth
                  disabled={isMaxQuantity}
                  size="large"
                  type="button"
                  color="warning"
                  variant="contained"
                  startIcon={<Icon icon={roundAddShoppingCart} />}
                  onClick={handleAddCart}
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Add to Cart
                </MButton>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            {SOCIALS.map((social) => (
              <Tooltip key={social.name} title={social.name}>
                <MIconButton>{social.icon}</MIconButton>
              </Tooltip>
            ))}
          </Box>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default Sumary;
